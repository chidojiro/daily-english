// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'prettier',
    // 'prettier/@typescript-eslint',
    // 'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', '@typescript-eslint'],
  // settings: {
  //   react: {
  //     version: 'detect',
  //   },
  // },
  rules: {
    //Possible Errors
    'comma-dangle': [2, 'always-multiline'], //disallow or enforce trailing commas
    'no-cond-assign': [2, 'always'], //disallow assignment in conditional expressions
    'no-console': [1, { allow: ['warn', 'error'] }], //disallow use of console
    'no-constant-condition': ['error', { checkLoops: false }], //disallow use of constant expressions in conditions
    'no-control-regex': 2, //disallow control characters in regular expressions (characters in the ASCII range 0-31)
    'no-debugger': 1, //disallow use of debugger
    'no-dupe-args': 2, //disallow duplicate arguments in functions
    'no-dupe-keys': 2, //disallow duplicate keys when creating object literals
    'no-duplicate-case': 2, //disallow a duplicate case label.
    'no-empty-character-class': 2, //disallow the use of empty character classes in regular expressions
    'no-empty': 2, //disallow empty block statements. {methods: Boolean} defaults to false (allow empty methods)
    // 'no-ex-assign': 0,  //disallow assigning to the exception in a catch block
    'no-extra-boolean-cast': 2, //disallow double-negation boolean casts in a boolean context
    // 'no-extra-parens': 0, //disallow unnecessary parentheses
    'no-extra-semi': 2, //disallow unnecessary semicolons
    // 'no-func-assign': 0, //disallow overwriting functions written as function declarations
    // 'no-inner-declarations': 0, //disallow function or variable declarations in nested blocks
    'no-invalid-regexp': 2, //disallow invalid regular expression strings in the RegExp constructor
    'no-irregular-whitespace': 2, //disallow irregular whitespace outside of strings and comments
    'no-negated-in-lhs': 2, //disallow negation of the left operand of an in expression
    'no-obj-calls': 2, //disallow the use of object properties of the global object (Math and JSON) as functions
    'no-regex-spaces': 2, //disallow multiple spaces in a regular expression literal
    'no-sparse-arrays': 2, //disallow sparse arrays
    // 'no-unexpected-multiline': [], //Avoid code that looks like two expressions but is actually one
    'no-unreachable': 2, //disallow unreachable statements after a return, throw, continue, or break statement
    'use-isnan': 2, //disallow comparisons with the value NaN
    // 'valid-jsdoc': 0, //Ensure JSDoc comments are valid
    'valid-typeof': 2, //Ensure that the results of typeof are compared against a valid string

    //Best Practices
    // accessor-pairs //Enforces getter/setter pairs in objects
    // array-callback-return //Enforces return statements in callbacks of array's methods
    // block-scoped-var //treat var statements as if they were block scoped
    // complexity //specify the maximum cyclomatic complexity allowed in a program
    // consistent-return //require return statements to either always or never specify values
    curly: [2, 'all'], //specify curly brace conventions for all control statements
    // default-case //require default case in switch statements
    // dot-location //enforces consistent newlines before or after dots
    // dot-notation //encourages use of dot notation whenever possible
    // eqeqeq //require the use of === and !==
    // guard-for-in //make sure for-in loops have an if statement
    'no-alert': 1, //disallow the use of alert, confirm, and prompt
    // no-caller //disallow use of arguments.caller or arguments.callee
    // no-case-declarations //disallow lexical declarations in case clauses
    // no-div-regex //disallow division operators explicitly at beginning of regular expression
    // no-else-return //disallow else after a return in an if
    // no-empty-pattern //disallow use of empty destructuring patterns
    // no-eq-null //disallow comparisons to null without a type-checking operator
    // no-eval //disallow use of eval()
    // no-extend-native //disallow adding to native types
    // no-extra-bind //disallow unnecessary function binding
    // no-extra-label //disallow unnecessary labels
    // no-fallthrough //disallow fallthrough of case statements
    // no-floating-decimal //disallow the use of leading or trailing decimal points in numeric literals
    // no-implicit-coercion //disallow the type conversions with shorter notations
    // no-implicit-globals //disallow var and named functions in global scope
    // no-implied-eval //disallow use of eval()-like methods
    // no-invalid-this //disallow this keywords outside of classes or class-like objects
    // no-iterator //disallow usage of __iterator__ property
    // no-labels //disallow use of labeled statements
    // no-lone-blocks //disallow unnecessary nested blocks
    // no-loop-func //disallow creation of functions within loops
    // no-magic-numbers //disallow the use of magic numbers
    // no-multi-spaces //disallow use of multiple spaces
    // no-multi-str //disallow use of multiline strings
    // no-native-reassign //disallow reassignments of native objects
    // no-new-func //disallow use of new operator for Function object
    // no-new-wrappers //disallows creating new instances of String,Number, and Boolean
    // no-new //disallow use of the new operator when not part of an assignment or comparison
    // no-octal-escape //disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    // no-octal //disallow use of octal literals
    // no-param-reassign //disallow reassignment of function parameters
    // no-process-env //disallow use of process.env
    // no-proto //disallow usage of __proto__ property
    // no-redeclare //disallow declaring the same variable more than once
    // no-return-assign //disallow use of assignment in return statement
    // no-script-url //disallow use of javascript: urls.
    // no-self-assign //disallow assignments where both sides are exactly the same
    // no-self-compare //disallow comparisons where both sides are exactly the same
    // no-sequences //disallow use of the comma operator
    // no-throw-literal //restrict what can be thrown as an exception
    // no-unmodified-loop-condition //disallow unmodified conditions of loops
    // no-unused-expressions //disallow usage of expressions in statement position
    // no-unused-labels //disallow unused labels
    // no-useless-call //disallow unnecessary .call() and .apply()
    // no-useless-concat //disallow unnecessary concatenation of literals or template literals
    // no-void //disallow use of the void operator
    'no-warning-comments': 1, //disallow usage of configurable warning terms in comments //e.g. TODO or FIXME
    // no-with //disallow use of the with statement
    // radix //require use of the second argument for parseInt()
    // vars-on-top //require declaration of all vars at the top of their containing scope
    // wrap-iife //require immediate function invocation to be wrapped in parentheses
    // yoda //require or disallow Yoda conditions

    //Variables
    // 'init-declarations': 0, //enforce or disallow variable initializations at definition
    // 'no-catch-shadow': 0, //disallow the catch clause parameter name being the same as a variable in the outer scope
    // 'no-delete-var': 0, //disallow deletion of variables
    // 'no-label-var': 0, //disallow labels that share a name with a variable
    // 'no-shadow-restricted-names': 0, //disallow shadowing of names such as arguments
    // 'no-shadow': 0, //disallow declaration of variables already declared in the outer scope
    // 'no-undef-init': 0, //disallow use of undefined when initializing variables
    // 'no-undef': 0, //disallow use of undeclared variables unless mentioned in a /*global */ block
    // 'no-undefined': 0, //disallow use of undefined variable
    'no-unused-vars': 1, //disallow declaration of variables that are not used in the code
    // 'no-use-before-define': 0, //disallow use of variables before they are defined

    //Node.js and CommonJS
    // 'callback-return': 0, //enforce return after a callback
    // 'global-require': 0, //enforce require() on top-level module scope
    // 'handle-callback-err': 0, //enforce error handling in callbacks
    // 'no-mixed-requires': 0, //disallow mixing regular variable and require declarations
    // 'no-new-require': 0, //disallow use of new operator with the require function
    // 'no-path-concat': 0, //disallow string concatenation with __dirname and __filename
    // 'no-process-exit': 0, //disallow process.exit()
    // 'no-restricted-imports': 0, //restrict usage of specified node imports
    // 'no-restricted-modules': 0, //restrict usage of specified node modules
    // 'no-sync': 0, //disallow use of synchronous methods

    //Stylistic Issues
    // 'array-bracket-spacing': , //enforce spacing inside array brackets
    // 'block-spacing': , //disallow or enforce spaces inside of single line blocks
    // 'brace-style': , //enforce one true brace style
    // 'camelcase': , //require camel case names
    // 'comma-spacing': , //enforce spacing before and after comma
    // 'comma-style': , //enforce one true comma style
    // 'computed-property-spacing': , //require or disallow padding inside computed properties
    // 'consistent-this': , //enforce consistent naming when capturing the current execution context
    // 'eol-last': , //enforce newline at the end of file, with no multiple empty lines
    // 'func-names': , //require function expressions to have a name
    // 'func-style': , //enforce use of function declarations or expressions
    // 'id-length': , //this option enforces minimum and maximum identifier lengths (variable names, property names etc.)
    // 'id-match': , //require identifiers to match the provided regular expression
    // 'id-blacklist': , //blacklist certain identifiers to prevent them being used
    // 'indent': , //specify tab or space width for your code
    // 'jsx-quotes': , //specify whether double or single quotes should be used in JSX attributes
    // 'key-spacing': , //enforce spacing between keys and values in object literal properties
    // 'keyword-spacing': , //enforce spacing before and after keywords
    // 'linebreak-style': , //disallow mixed 'LF' and 'CRLF' as linebreaks
    // 'lines-around-comment': , //enforce empty lines around comments
    // 'max-depth': , //specify the maximum depth that blocks can be nested
    // 'max-len': , //specify the maximum length of a line in your program
    // 'max-nested-callbacks': , //specify the maximum depth callbacks can be nested
    // 'max-params': , //limits the number of parameters that can be used in the function declaration
    // 'max-statements ': ,//specify the maximum number of statement allowed in a function
    // 'new-cap': , //require a capital letter for constructors
    // 'new-parens': , //disallow the omission of parentheses when invoking a constructor with no arguments
    // 'newline-after-var': , //require or disallow an empty newline after variable declarations
    // 'newline-per-chained-call': , //enforce newline after each call when chaining the calls
    // 'no-array-constructor': , //disallow use of the Array constructor
    // 'no-bitwise': , //disallow use of bitwise operators
    // 'no-continue': , //disallow use of the continue statement
    // 'no-inline-comments': , //disallow comments inline after code
    // 'no-lonely-if': , //disallow if as the only statement in an else block
    // 'no-mixed-spaces-and-tabs': , //disallow mixed spaces and tabs for indentation
    // 'no-multiple-empty-lines': , //disallow multiple empty lines
    // 'no-negated-condition': , //disallow negated conditions
    // 'no-nested-ternary': , //disallow nested ternary expressions
    // 'no-new-object': , //disallow the use of the Object constructor
    // 'no-plusplus': , //disallow use of unary operators, ++ and --
    // 'no-restricted-syntax': , //disallow use of certain syntax in code
    // 'no-whitespace-before-property': , //disallow whitespace before properties
    // 'no-spaced-func': , //disallow space between function identifier and application
    // 'no-ternary': , //disallow the use of ternary operators
    // 'no-trailing-spaces': , //disallow trailing whitespace at the end of lines
    // 'no-underscore-dangle': , //disallow dangling underscores in identifiers
    // 'no-unneeded-ternary': , //disallow the use of ternary operators when a simpler alternative exists
    // 'object-curly-spacing': , //require or disallow padding inside curly braces
    // 'one-var': , //require or disallow one variable declaration per function
    // 'one-var-declaration-per-line': , //require or disallow an newline around variable declarations
    // 'operator-assignment': , //require assignment operator shorthand where possible or prohibit it entirely
    // 'operator-linebreak': , //enforce operators to be placed before or after line breaks
    // 'padded-blocks': , //enforce padding within blocks
    // 'quote-props': , //require quotes around object literal property names
    // 'quotes': , //specify whether backticks, double or single quotes should be used
    // 'require-jsdoc': 0, //Require JSDoc comment
    // 'semi-spacing': 0, //enforce spacing before and after semicolons
    // 'semi': 2, //require or disallow use of semicolons instead of ASI
    // 'sort-vars': , //sort variables within the same declaration block
    // 'sort-imports': , //sort import declarations within module
    // 'space-before-blocks': 2, //require or disallow a space before blocks
    // 'space-before-function-paren': , //require or disallow a space before function opening parenthesis
    // 'space-in-parens': , //require or disallow spaces inside parentheses
    // 'space-infix-ops': , //require spaces around operators
    // 'space-unary-ops': , //require or disallow spaces before/after unary operators
    // 'spaced-comment': , //require or disallow a space immediately following the // or /* in a comment
    // 'wrap-regex': , //require regex literals to be wrapped in parentheses

    //ECMAScript 6
    // 'arrow-body-style': 0, //require braces in arrow function body
    'arrow-parens': 2, //require parens in arrow function arguments
    'arrow-spacing': 2, //require space before/after arrow function's arrow
    'constructor-super': 2, //verify calls of super() in constructors
    'generator-star-spacing': [2, 'after'], //enforce spacing around the * in generator functions
    'no-class-assign': 2, //disallow modifying variables of class declarations
    // 'no-confusing-arrow': 0, //disallow arrow functions where they could be confused with comparisons
    // 'no-const-assign': 0, //disallow modifying variables that are declared using const
    // 'no-dupe-class-members': 0, //disallow duplicate name in class members
    // 'no-new-symbol': 0, //disallow use of the new operator with the Symbol object
    // 'no-this-before-super': 0, //disallow use of this/super before calling super() in constructors
    'no-var': 2, //require let or const instead of var
    'no-useless-constructor': 2, //disallow unnecessary constructor
    'object-shorthand': 2, //require method and property shorthand syntax for object literals
    'prefer-arrow-callback': 2, //suggest using arrow functions as callbacks
    'prefer-const': 2, //suggest using const declaration for variables that are never modified after declared
    // 'prefer-reflect': 0, //suggest using Reflect methods where applicable
    'prefer-rest-params': 2, //suggest using the rest parameters instead of arguments
    'prefer-spread': 2, //suggest using the spread operator instead of .apply()
    'prefer-template': 2, //suggest using template literals instead of strings concatenation
    'require-yield': 2, //disallow generator functions that do not have yield
    'template-curly-spacing': 2, //enforce spacing around embedded expressions of template strings, 'never'/'always'
    'yield-star-spacing': [2, 'after'], //enforce spacing around the * in yield* expressions

    //@typescript-eslint
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-unused-vars': 1,
    // '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,

    //react/recommended
    'react/prop-types': 0,
  },
};
