
TESTS = test/*.js
REPORTER = dot

SRC = $(shell find lib/*.js lib/middleware/*.js)

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 600 \
		--bail \
		$(TESTS)


.PHONY: test
