BUN ?= bun
PORT ?= 3000
DIST_DIR ?= dist
STANDALONE_TAR ?= $(DIST_DIR)/standalone.tar.gz
RUN_DIR ?= $(HOME)/tmp/runtimes/fumadocs_blog
STANDALONE_URL ?=

.PHONY: help install dev build postbuild start check check-fix format lint clean package-standalone run-standalone

help:
	@echo "Targets:"
	@echo "  install            Install dependencies"
	@echo "  dev                Run dev server"
	@echo "  build              Build production"
	@echo "  postbuild          Run postbuild (sitemap/robots)"
	@echo "  start              Start production server"
	@echo "  check              Run format + lint checks"
	@echo "  check-fix          Auto-fix format + lint"
	@echo "  format             Format code"
	@echo "  lint               Lint code"
	@echo "  clean              Remove build artifacts"
	@echo "  package-standalone Build and package standalone tarball"
	@echo "  run-standalone      Run standalone server (PORT=xxxx)"

install:
	$(BUN) install

dev:
	$(BUN) dev

build:
	$(BUN) run build

postbuild:
	$(BUN) run postbuild

start:
	$(BUN) run start

check:
	$(BUN) run check

check-fix:
	$(BUN) run check:fix

format:
	$(BUN) run format

lint:
	$(BUN) run lint

clean:
	rm -rf .next .source $(DIST_DIR)

package-standalone: build
	mkdir -p $(DIST_DIR)
	rm -rf .next/standalone/.next .next/standalone/public
	mkdir -p .next/standalone/.next
	cp .next/BUILD_ID .next/standalone/.next/
	cp .next/app-path-routes-manifest.json .next/standalone/.next/
	cp .next/build-manifest.json .next/standalone/.next/
	cp .next/fallback-build-manifest.json .next/standalone/.next/
	cp .next/images-manifest.json .next/standalone/.next/
	cp .next/prerender-manifest.json .next/standalone/.next/
	cp .next/required-server-files.json .next/standalone/.next/
	cp .next/routes-manifest.json .next/standalone/.next/
	cp -R .next/server .next/standalone/.next/
	cp -R .next/static .next/standalone/.next/
	cp -R public .next/standalone/
	tar -czf $(STANDALONE_TAR) -C .next/standalone .

run-standalone:
	@if lsof -iTCP:$(PORT) -sTCP:LISTEN >/dev/null 2>&1; then \
	  echo "Port $(PORT) is already in use by:"; \
	  lsof -iTCP:$(PORT) -sTCP:LISTEN; \
	  exit 1; \
	fi
	rm -rf $(RUN_DIR)
	mkdir -p $(RUN_DIR)
	@if [ -n "$(STANDALONE_URL)" ]; then \
	  echo "Downloading standalone package from $(STANDALONE_URL)"; \
	  curl -fsSL "$(STANDALONE_URL)" -o $(RUN_DIR)/standalone.tar.gz; \
	  tar -xzf $(RUN_DIR)/standalone.tar.gz -C $(RUN_DIR); \
	else \
	  tar -xzf $(STANDALONE_TAR) -C $(RUN_DIR); \
	fi
	cd $(RUN_DIR) && PORT=$(PORT) node server.js
