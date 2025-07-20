# Makefile

# TypeScript derleyici
TSC = tsc

# Kaynak ve çıktı dizinleri
SRC_DIR = js
DIST_DIR = dist

# Default hedef
all: build

# .ts dosyalarını derleyip .js dosyası üret
build: $(NODE_MODULES) init-ts
	@if [ -f $(TSCONFIG) ]; then \
		npx tsc; \
	else \
		mkdir -p $(JS_OUT); \
		npx tsc js/*.ts --outDir $(JS_OUT) --target es2020 --module es6 --lib es2020,dom --moduleResolution node; \
	fi

# Serve files with HTTP server to avoid CORS
serve: build
	npx http-server . -p 8080 -c-1

# Development with live server
dev-serve: $(NODE_MODULES)
	npx live-server --port=8080 --no-browser

# Çıktı dosyalarını temizler
clean:
	rm -rf $(DIST_DIR)

# Hem temizler hem yeniden derler
rebuild: clean build

# Derleyip programı çalıştırır
run: build
	node $(DIST_DIR)/main.js

.PHONY: all install init-ts build run dev serve dev-serve clean clean-all rebuild
