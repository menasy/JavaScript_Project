TSC = tsc
SRC_DIR = js
DIST_DIR = dist

all: compile

compile: $(NODE_MODULES) init-ts
	@if [ -f $(TSCONFIG) ]; then \
		npx tsc; \
	else \
		mkdir -p $(JS_OUT); \
		npx tsc js/*.ts --outDir $(JS_OUT) --target es2020 --module es6 --lib es2020,dom --moduleResolution node; \
	fi

build: $(NODE_MODULES) init-ts
	@if [ -f $(TSCONFIG) ]; then \
		npx tsc; \
	else \
		mkdir -p $(JS_OUT); \
		npx tsc js/*.ts --outDir $(JS_OUT) --target es2020 --module es6 --lib es2020,dom --moduleResolution node; \
	fi
	@echo "Build tamamlandı, live server başlatılıyor..."
	@npx live-server --port=8080 --open=html/index.html &

serve: compile
	npx http-server . -p 8080 -c-1

dev-serve: $(NODE_MODULES)
	npx live-server --port=8080 --no-browser

clean:
	rm -rf $(DIST_DIR)

rebuild: clean compile

run: compile
	node $(DIST_DIR)/main.js

.PHONY: all install init-ts compile build run dev serve dev-serve clean clean-all rebuild