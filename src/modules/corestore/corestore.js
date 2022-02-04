var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    init_node_globals();
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    init_node_globals();
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    init_node_globals();
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer3;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer3.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer3.prototype;
    };
    Buffer3.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer3.from(b, b.offset, b.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer3.isBuffer(buf))
              buf = Buffer3.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(buffer, buf, pos);
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer3.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b) {
      if (!Buffer3.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val2, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val2 === "string") {
        val2 = Buffer3.from(val2, encoding);
      }
      if (Buffer3.isBuffer(val2)) {
        if (val2.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val2, byteOffset, encoding, dir);
      } else if (typeof val2 === "number") {
        val2 = val2 & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val2, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val2, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val2], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val2, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val2.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val2.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val2, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val2, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes(val2, byteOffset, encoding) {
      return this.indexOf(val2, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val2, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val2, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val2, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val2, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer3.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val2 = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val2 += this[offset + i] * mul;
      }
      return val2;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val2 = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val2 += this[offset + --byteLength2] * mul;
      }
      return val2;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val2 = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val2 += this[offset + i] * mul;
      }
      mul *= 128;
      if (val2 >= mul)
        val2 -= Math.pow(2, 8 * byteLength2);
      return val2;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val2 = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val2 += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val2 >= mul)
        val2 -= Math.pow(2, 8 * byteLength2);
      return val2;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val2 = this[offset] | this[offset + 1] << 8;
      return val2 & 32768 ? val2 | 4294901760 : val2;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val2 = this[offset + 1] | this[offset] << 8;
      return val2 & 32768 ? val2 | 4294901760 : val2;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val2 = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val2) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val2 = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val2) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer3.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    };
    Buffer3.prototype.fill = function fill(val2, start, end, encoding) {
      if (typeof val2 === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val2.length === 1) {
          const code = val2.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val2 = code;
          }
        }
      } else if (typeof val2 === "number") {
        val2 = val2 & 255;
      } else if (typeof val2 === "boolean") {
        val2 = Number(val2);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val2)
        val2 = 0;
      let i;
      if (typeof val2 === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val2;
        }
      } else {
        const bytes = Buffer3.isBuffer(val2) ? val2 : Buffer3.from(val2, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val2 + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    }, RangeError);
    function addNumericalSeparator(val2) {
      let res = "";
      let i = val2.length;
      const start = val2[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val2.slice(i - 3, i)}${res}`;
      }
      return `${val2.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/process/browser.js
var require_browser = __commonJS({
  "node_modules/process/browser.js"(exports, module) {
    init_node_globals();
    var process2 = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        if (typeof setTimeout === "function") {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === "function") {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
      }
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e2) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
      }
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e2) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }
    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process2.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process2.title = "browser";
    process2.browser = true;
    process2.env = {};
    process2.argv = [];
    process2.version = "";
    process2.versions = {};
    function noop() {
    }
    process2.on = noop;
    process2.addListener = noop;
    process2.once = noop;
    process2.off = noop;
    process2.removeListener = noop;
    process2.removeAllListeners = noop;
    process2.emit = noop;
    process2.prependListener = noop;
    process2.prependOnceListener = noop;
    process2.listeners = function(name) {
      return [];
    };
    process2.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process2.cwd = function() {
      return "/";
    };
    process2.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process2.umask = function() {
      return 0;
    };
  }
});

// src/node-globals.js
var Buffer2, process;
var init_node_globals = __esm({
  "src/node-globals.js"() {
    Buffer2 = require_buffer().Buffer;
    process = require_browser();
  }
});

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    init_node_globals();
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit("newListener", type, listener.listener ? listener.listener : listener);
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/safety-catch/index.js
var require_safety_catch = __commonJS({
  "node_modules/safety-catch/index.js"(exports, module) {
    init_node_globals();
    module.exports = safetyCatch;
    function isActuallyUncaught(err) {
      return err instanceof TypeError || err instanceof SyntaxError || err instanceof ReferenceError || err instanceof EvalError || err instanceof RangeError || err instanceof URIError || err.code === "ERR_ASSERTION";
    }
    function throwErrorNT(err) {
      queueMicrotask(() => {
        throw err;
      });
    }
    function safetyCatch(err) {
      if (isActuallyUncaught(err)) {
        throwErrorNT(err);
        throw err;
      }
    }
  }
});

// node_modules/nanoassert/index.js
var require_nanoassert = __commonJS({
  "node_modules/nanoassert/index.js"(exports, module) {
    init_node_globals();
    module.exports = assert;
    var AssertionError = class extends Error {
    };
    AssertionError.prototype.name = "AssertionError";
    function assert(t, m) {
      if (!t) {
        var err = new AssertionError(m);
        if (Error.captureStackTrace)
          Error.captureStackTrace(err, assert);
        throw err;
      }
    }
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
    init_node_globals();
  }
});

// node_modules/sodium-javascript/randombytes.js
var require_randombytes = __commonJS({
  "node_modules/sodium-javascript/randombytes.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var randombytes = function() {
      var QUOTA = 65536;
      var crypto = globalThis.crypto || globalThis.msCrypto;
      function browserBytes(out, n) {
        for (let i = 0; i < n; i += QUOTA) {
          crypto.getRandomValues(new Uint8Array(out.buffer, i + out.byteOffset, Math.min(n - i, QUOTA)));
        }
      }
      function nodeBytes(out, n) {
        new Uint8Array(out.buffer, out.byteOffset, n).set(crypto.randomBytes(n));
      }
      function noImpl() {
        throw new Error("No secure random number generator available");
      }
      if (crypto && crypto.getRandomValues)
        return browserBytes;
      if (__require != null) {
        crypto = require_crypto();
        if (crypto && crypto.randomBytes)
          return nodeBytes;
      }
      return noImpl;
    }();
    Object.defineProperty(module.exports, "randombytes", {
      value: randombytes
    });
    module.exports.randombytes_buf = function(out) {
      assert(out, "out must be given");
      randombytes(out, out.byteLength);
    };
  }
});

// (disabled):worker_threads
var require_worker_threads = __commonJS({
  "(disabled):worker_threads"() {
    init_node_globals();
  }
});

// node_modules/sodium-javascript/memory.js
var require_memory = __commonJS({
  "node_modules/sodium-javascript/memory.js"(exports, module) {
    init_node_globals();
    function sodium_malloc(n) {
      return new Uint8Array(n);
    }
    function sodium_free(n) {
      sodium_memzero(n);
      loadSink().port1.postMessage(n.buffer, [n.buffer]);
    }
    function sodium_memzero(arr) {
      arr.fill(0);
    }
    var sink;
    function loadSink() {
      if (sink)
        return sink;
      var MessageChannel = globalThis.MessageChannel;
      if (MessageChannel == null)
        ({ MessageChannel } = require_worker_threads());
      sink = new MessageChannel();
      return sink;
    }
    module.exports = {
      sodium_malloc,
      sodium_free,
      sodium_memzero
    };
  }
});

// node_modules/sodium-javascript/crypto_verify.js
var require_crypto_verify = __commonJS({
  "node_modules/sodium-javascript/crypto_verify.js"(exports, module) {
    init_node_globals();
    module.exports = {
      crypto_verify_16,
      crypto_verify_32,
      crypto_verify_64
    };
    function vn(x, xi, y, yi, n) {
      var d = 0;
      for (let i = 0; i < n; i++)
        d |= x[xi + i] ^ y[yi + i];
      return (1 & d - 1 >>> 8) - 1;
    }
    Object.defineProperty(module.exports, "vn", {
      value: vn
    });
    function crypto_verify_16(x, xi, y, yi) {
      return vn(x, xi, y, yi, 16) === 0;
    }
    function crypto_verify_32(x, xi, y, yi) {
      return vn(x, xi, y, yi, 32) === 0;
    }
    function crypto_verify_64(x, xi, y, yi) {
      return vn(x, xi, y, yi, 64) === 0;
    }
  }
});

// node_modules/sodium-javascript/helpers.js
var require_helpers = __commonJS({
  "node_modules/sodium-javascript/helpers.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var { vn } = require_crypto_verify();
    function sodium_increment(n) {
      const nlen = n.byteLength;
      var c = 1;
      for (var i = 0; i < nlen; i++) {
        c += n[i];
        n[i] = c;
        c >>= 8;
      }
    }
    function sodium_memcmp(a, b) {
      assert(a.byteLength === b.byteLength, "buffers must be the same size");
      return vn(a, 0, b, 0, a.byteLength) === 0;
    }
    function sodium_is_zero(arr) {
      var d = 0;
      for (let i = 0; i < arr.length; i++)
        d |= arr[i];
      return d === 0;
    }
    module.exports = {
      sodium_increment,
      sodium_memcmp,
      sodium_is_zero
    };
  }
});

// node_modules/b4a/lib/ascii.js
var require_ascii = __commonJS({
  "node_modules/b4a/lib/ascii.js"(exports, module) {
    init_node_globals();
    function byteLength(string) {
      return string.length;
    }
    function toString(buffer) {
      const len = buffer.byteLength;
      let result = "";
      for (let i = 0; i < len; i++) {
        result += String.fromCharCode(buffer[i]);
      }
      return result;
    }
    function write(buffer, string, offset = 0, length = byteLength(string)) {
      const len = Math.min(length, buffer.byteLength - offset);
      for (let i = 0; i < len; i++) {
        buffer[offset + i] = string.charCodeAt(i);
      }
      return len;
    }
    module.exports = {
      byteLength,
      toString,
      write
    };
  }
});

// node_modules/b4a/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/b4a/lib/base64.js"(exports, module) {
    init_node_globals();
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var codes = new Uint8Array(256);
    for (let i = 0; i < alphabet.length; i++) {
      codes[alphabet.charCodeAt(i)] = i;
    }
    codes[45] = 62;
    codes[95] = 63;
    function byteLength(string) {
      let len = string.length;
      if (string.charCodeAt(len - 1) === 61)
        len--;
      if (len > 1 && string.charCodeAt(len - 1) === 61)
        len--;
      return len * 3 >>> 2;
    }
    function toString(buffer) {
      const len = buffer.byteLength;
      let result = "";
      for (let i = 0; i < len; i += 3) {
        result += alphabet[buffer[i] >> 2] + alphabet[(buffer[i] & 3) << 4 | buffer[i + 1] >> 4] + alphabet[(buffer[i + 1] & 15) << 2 | buffer[i + 2] >> 6] + alphabet[buffer[i + 2] & 63];
      }
      if (len % 3 === 2) {
        result = result.substring(0, result.length - 1) + "=";
      } else if (len % 3 === 1) {
        result = result.substring(0, result.length - 2) + "==";
      }
      return result;
    }
    function write(buffer, string, offset = 0, length = byteLength(string)) {
      const len = Math.min(length, buffer.byteLength - offset);
      for (let i = 0, j = 0; i < len; i += 4) {
        const a = codes[string.charCodeAt(i)];
        const b = codes[string.charCodeAt(i + 1)];
        const c = codes[string.charCodeAt(i + 2)];
        const d = codes[string.charCodeAt(i + 3)];
        buffer[j++] = a << 2 | b >> 4;
        buffer[j++] = (b & 15) << 4 | c >> 2;
        buffer[j++] = (c & 3) << 6 | d & 63;
      }
      return len;
    }
    module.exports = {
      byteLength,
      toString,
      write
    };
  }
});

// node_modules/b4a/lib/hex.js
var require_hex = __commonJS({
  "node_modules/b4a/lib/hex.js"(exports, module) {
    init_node_globals();
    function byteLength(string) {
      return string.length >>> 1;
    }
    function toString(buffer) {
      const len = buffer.byteLength;
      buffer = new DataView(buffer.buffer, buffer.byteOffset, len);
      let result = "";
      let i = 0;
      for (let n = len - len % 4; i < n; i += 4) {
        result += buffer.getUint32(i).toString(16).padStart(8, "0");
      }
      for (; i < len; i++) {
        result += buffer.getUint8(i).toString(16).padStart(2, "0");
      }
      return result;
    }
    function write(buffer, string, offset = 0, length = byteLength(string)) {
      const len = Math.min(length, buffer.byteLength - offset);
      for (let i = 0; i < len; i++) {
        const a = hexValue(string.charCodeAt(i * 2));
        const b = hexValue(string.charCodeAt(i * 2 + 1));
        if (a === void 0 || b === void 0) {
          return buffer.subarray(0, i);
        }
        buffer[offset + i] = a << 4 | b;
      }
      return len;
    }
    module.exports = {
      byteLength,
      toString,
      write
    };
    function hexValue(char) {
      if (char >= 48 && char <= 57)
        return char - 48;
      if (char >= 65 && char <= 70)
        return char - 65 + 10;
      if (char >= 97 && char <= 102)
        return char - 97 + 10;
    }
  }
});

// node_modules/b4a/lib/utf8.js
var require_utf8 = __commonJS({
  "node_modules/b4a/lib/utf8.js"(exports, module) {
    init_node_globals();
    function byteLength(string) {
      let length = 0;
      for (let i = 0, n = string.length; i < n; i++) {
        const code = string.charCodeAt(i);
        if (code >= 55296 && code <= 56319 && i + 1 < n) {
          const code2 = string.charCodeAt(i + 1);
          if (code2 >= 56320 && code2 <= 57343) {
            length += 4;
            i++;
            continue;
          }
        }
        if (code <= 127)
          length += 1;
        else if (code <= 2047)
          length += 2;
        else
          length += 3;
      }
      return length;
    }
    var toString;
    if (typeof TextDecoder !== "undefined") {
      const decoder = new TextDecoder();
      toString = function toString2(buffer) {
        return decoder.decode(buffer);
      };
    } else {
      toString = function toString2(buffer) {
        const len = buffer.byteLength;
        let output = "";
        let i = 0;
        while (i < len) {
          let byte = buffer[i];
          if (byte <= 127) {
            output += String.fromCharCode(byte);
            i++;
            continue;
          }
          let bytesNeeded = 0;
          let codePoint = 0;
          if (byte <= 223) {
            bytesNeeded = 1;
            codePoint = byte & 31;
          } else if (byte <= 239) {
            bytesNeeded = 2;
            codePoint = byte & 15;
          } else if (byte <= 244) {
            bytesNeeded = 3;
            codePoint = byte & 7;
          }
          if (len - i - bytesNeeded > 0) {
            let k = 0;
            while (k < bytesNeeded) {
              byte = buffer[i + k + 1];
              codePoint = codePoint << 6 | byte & 63;
              k += 1;
            }
          } else {
            codePoint = 65533;
            bytesNeeded = len - i;
          }
          output += String.fromCodePoint(codePoint);
          i += bytesNeeded + 1;
        }
        return output;
      };
    }
    var write;
    if (typeof TextEncoder !== "undefined") {
      const encoder = new TextEncoder();
      write = function write2(buffer, string, offset = 0, length = byteLength(string)) {
        const len = Math.min(length, buffer.byteLength - offset);
        encoder.encodeInto(string, buffer.subarray(offset, offset + len));
        return len;
      };
    } else {
      write = function write2(buffer, string, offset = 0, length = byteLength(string)) {
        const len = Math.min(length, buffer.byteLength - offset);
        buffer = buffer.subarray(offset, offset + len);
        let i = 0;
        let j = 0;
        while (i < string.length) {
          const code = string.codePointAt(i);
          if (code <= 127) {
            buffer[j++] = code;
            i++;
            continue;
          }
          let count = 0;
          let bits = 0;
          if (code <= 2047) {
            count = 6;
            bits = 192;
          } else if (code <= 65535) {
            count = 12;
            bits = 224;
          } else if (code <= 2097151) {
            count = 18;
            bits = 240;
          }
          buffer[j++] = bits | code >> count;
          count -= 6;
          while (count >= 0) {
            buffer[j++] = 128 | code >> count & 63;
            count -= 6;
          }
          i += code >= 65536 ? 2 : 1;
        }
        return len;
      };
    }
    module.exports = {
      byteLength,
      toString,
      write
    };
  }
});

// node_modules/b4a/lib/utf16le.js
var require_utf16le = __commonJS({
  "node_modules/b4a/lib/utf16le.js"(exports, module) {
    init_node_globals();
    function byteLength(string) {
      return string.length * 2;
    }
    function toString(buffer) {
      const len = buffer.byteLength;
      let result = "";
      for (let i = 0; i < len - 1; i += 2) {
        result += String.fromCharCode(buffer[i] + buffer[i + 1] * 256);
      }
      return result;
    }
    function write(buffer, string, offset = 0, length = byteLength(string)) {
      const len = Math.min(length, buffer.byteLength - offset);
      let units = len;
      for (let i = 0; i < string.length; ++i) {
        if ((units -= 2) < 0)
          break;
        const c = string.charCodeAt(i);
        const hi = c >> 8;
        const lo = c % 256;
        buffer[offset + i * 2] = lo;
        buffer[offset + i * 2 + 1] = hi;
      }
      return len;
    }
    module.exports = {
      byteLength,
      toString,
      write
    };
  }
});

// node_modules/b4a/browser.js
var require_browser2 = __commonJS({
  "node_modules/b4a/browser.js"(exports, module) {
    init_node_globals();
    var ascii = require_ascii();
    var base64 = require_base64();
    var hex = require_hex();
    var utf8 = require_utf8();
    var utf16le = require_utf16le();
    function codecFor(encoding) {
      switch (encoding) {
        case "ascii":
          return ascii;
        case "base64":
          return base64;
        case "hex":
          return hex;
        case "utf8":
        case "utf-8":
        case void 0:
          return utf8;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16le;
        default:
          throw new Error(`Unknown encoding: ${encoding}`);
      }
    }
    function isBuffer(value) {
      return value instanceof Uint8Array;
    }
    function alloc(size, fill2, encoding) {
      const buffer = new Uint8Array(size);
      if (fill2 !== void 0)
        fill2(buffer, fill2, 0, buffer.byteLength, encoding);
      return buffer;
    }
    function allocUnsafe(size) {
      return new Uint8Array(size);
    }
    function allocUnsafeSlow(size) {
      return new Uint8Array(size);
    }
    function byteLength(string, encoding) {
      return codecFor(encoding).byteLength(string);
    }
    function compare(a, b) {
      if (a === b)
        return 0;
      const len = Math.min(a.byteLength, b.byteLength);
      a = new DataView(a.buffer, a.byteOffset, a.byteLength);
      b = new DataView(b.buffer, b.byteOffset, b.byteLength);
      let i = 0;
      for (let n = len - len % 4; i < n; i += 4) {
        const x = a.getUint32(i);
        const y = b.getUint32(i);
        if (x < y)
          return -1;
        if (x > y)
          return 1;
      }
      for (; i < len; i++) {
        const x = a.getUint8(i);
        const y = b.getUint8(i);
        if (x < y)
          return -1;
        if (x > y)
          return 1;
      }
      return a.byteLength > b.byteLength ? 1 : a.byteLength < b.byteLength ? -1 : 0;
    }
    function concat(buffers, totalLength) {
      if (totalLength === void 0) {
        totalLength = buffers.reduce((len, buffer) => len + buffer.byteLength, 0);
      }
      const result = new Uint8Array(totalLength);
      buffers.reduce((offset, buffer) => {
        result.set(buffer, offset);
        return offset + buffer.byteLength;
      }, 0);
      return result;
    }
    function copy(source, target, targetStart = 0, start = 0, end = source.byteLength) {
      if (end > 0 && end < start)
        return 0;
      if (end === start)
        return 0;
      if (source.byteLength === 0 || target.byteLength === 0)
        return 0;
      if (targetStart < 0)
        throw new RangeError("targetStart is out of range");
      if (start < 0 || start >= source.byteLength)
        throw new RangeError("sourceStart is out of range");
      if (end < 0)
        throw new RangeError("sourceEnd is out of range");
      if (targetStart >= target.byteLength)
        targetStart = target.byteLength;
      if (end > source.byteLength)
        end = source.byteLength;
      if (target.byteLength - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (source === target) {
        target.copyWithin(targetStart, start, end);
      } else {
        target.set(source.subarray(start, end), targetStart);
      }
      return len;
    }
    function equals(a, b) {
      if (a === b)
        return true;
      if (a.byteLength !== b.byteLength)
        return false;
      const len = a.byteLength;
      a = new DataView(a.buffer, a.byteOffset, a.byteLength);
      b = new DataView(b.buffer, b.byteOffset, b.byteLength);
      let i = 0;
      for (let n = len - len % 4; i < n; i += 4) {
        if (a.getUint32(i) !== b.getUint32(i))
          return false;
      }
      for (; i < len; i++) {
        if (a.getUint8(i) !== b.getUint8(i))
          return false;
      }
      return true;
    }
    function fill(buffer, value, offset, end, encoding) {
      if (typeof value === "string") {
        if (typeof offset === "string") {
          encoding = offset;
          offset = 0;
          end = buffer.byteLength;
        } else if (typeof end === "string") {
          encoding = end;
          end = buffer.byteLength;
        }
      } else if (typeof val === "number") {
        value = value & 255;
      } else if (typeof val === "boolean") {
        value = +value;
      }
      if (offset < 0 || buffer.byteLength < offset || buffer.byteLength < end) {
        throw new RangeError("Out of range index");
      }
      if (offset === void 0)
        offset = 0;
      if (end === void 0)
        end = buffer.byteLength;
      if (end <= offset)
        return buffer;
      if (!value)
        value = 0;
      if (typeof value === "number") {
        for (let i = offset; i < end; ++i) {
          buffer[i] = value;
        }
      } else {
        value = isBuffer(value) ? value : from(value, encoding);
        const len = value.byteLength;
        for (let i = 0; i < end - offset; ++i) {
          buffer[i + offset] = value[i % len];
        }
      }
      return buffer;
    }
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string")
        return fromString(value, encodingOrOffset);
      if (Array.isArray(value))
        return fromArray(value);
      if (ArrayBuffer.isView(value))
        return fromBuffer(value);
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    function fromString(string, encoding) {
      const codec = codecFor(encoding);
      const buffer = new Uint8Array(codec.byteLength(string));
      codec.write(buffer, string, 0, buffer.byteLength);
      return buffer;
    }
    function fromArray(array) {
      const buffer = new Uint8Array(array.length);
      buffer.set(array);
      return buffer;
    }
    function fromBuffer(buffer) {
      const copy2 = new Uint8Array(buffer.byteLength);
      copy2.set(buffer);
      return copy2;
    }
    function fromArrayBuffer(arrayBuffer, byteOffset, length) {
      return new Uint8Array(arrayBuffer, byteOffset, length);
    }
    function swap(buffer, n, m) {
      const i = buffer[n];
      buffer[n] = buffer[m];
      buffer[m] = i;
    }
    function swap16(buffer) {
      const len = buffer.byteLength;
      if (len % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let i = 0; i < len; i += 2)
        swap(buffer, i, i + 1);
      return buffer;
    }
    function swap32(buffer) {
      const len = buffer.byteLength;
      if (len % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let i = 0; i < len; i += 4) {
        swap(buffer, i, i + 3);
        swap(buffer, i + 1, i + 2);
      }
      return buffer;
    }
    function swap64(buffer) {
      const len = buffer.byteLength;
      if (len % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let i = 0; i < len; i += 8) {
        swap(buffer, i, i + 7);
        swap(buffer, i + 1, i + 6);
        swap(buffer, i + 2, i + 5);
        swap(buffer, i + 3, i + 4);
      }
      return buffer;
    }
    function toBuffer(buffer) {
      return buffer;
    }
    function toString(buffer, encoding, start = 0, end = buffer.byteLength) {
      const len = buffer.byteLength;
      if (start >= len)
        return "";
      if (end <= start)
        return "";
      if (start < 0)
        start = 0;
      if (end > len)
        end = len;
      if (start !== 0 || end < len)
        buffer = buffer.subarray(start, end);
      return codecFor(encoding).toString(buffer);
    }
    function write(buffer, string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        offset = void 0;
      } else if (encoding === void 0 && typeof length === "string") {
        encoding = length;
        length = void 0;
      }
      return codecFor(encoding).write(buffer, string, offset, length);
    }
    module.exports = {
      isBuffer,
      alloc,
      allocUnsafe,
      allocUnsafeSlow,
      byteLength,
      compare,
      concat,
      copy,
      equals,
      fill,
      from,
      swap16,
      swap32,
      swap64,
      toBuffer,
      toString,
      write
    };
  }
});

// node_modules/sha512-universal/sha512.js
var require_sha512 = __commonJS({
  "node_modules/sha512-universal/sha512.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var b4a = require_browser2();
    module.exports = Sha512;
    var BLOCKSIZE = 128;
    var K = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    function Sha512() {
      if (!(this instanceof Sha512))
        return new Sha512();
      this.hh = new Int32Array(8);
      this.hl = new Int32Array(8);
      this.buffer = new Uint8Array(128);
      this.finalised = false;
      this.bytesRead = 0;
      this.pos = 0;
      this.hh[0] = 1779033703;
      this.hh[1] = 3144134277;
      this.hh[2] = 1013904242;
      this.hh[3] = 2773480762;
      this.hh[4] = 1359893119;
      this.hh[5] = 2600822924;
      this.hh[6] = 528734635;
      this.hh[7] = 1541459225;
      this.hl[0] = 4089235720;
      this.hl[1] = 2227873595;
      this.hl[2] = 4271175723;
      this.hl[3] = 1595750129;
      this.hl[4] = 2917565137;
      this.hl[5] = 725511199;
      this.hl[6] = 4215389547;
      this.hl[7] = 327033209;
      return this;
    }
    Sha512.prototype.update = function(input, enc) {
      assert(this.finalised === false, "Hash instance finalised");
      var [inputBuf, len] = formatInput(input, enc);
      this.bytesRead += len;
      const full = len + this.pos & -128;
      this.buffer.set(inputBuf.subarray(0, BLOCKSIZE - this.pos), this.pos);
      const pos = this.pos;
      len -= BLOCKSIZE - this.pos;
      if (len >= 0) {
        compress(this.hh, this.hl, this.buffer, 128);
        this.pos = 0;
      }
      if (len > 127) {
        compress(this.hh, this.hl, inputBuf.subarray(BLOCKSIZE - pos, full - pos), full - BLOCKSIZE);
        len %= 128;
      }
      this.buffer.set(inputBuf.subarray(inputBuf.byteLength - len));
      this.pos = this.bytesRead & 127;
      this.buffer.fill(0, this.pos);
      return this;
    };
    Sha512.prototype.digest = function(enc, offset = 0) {
      assert(this.finalised === false, "Hash instance finalised");
      this.finalised = true;
      this.buffer.fill(0, this.pos);
      this.buffer[this.pos] = 128;
      if (this.pos > 111) {
        compress(this.hh, this.hl, this.buffer, 128);
        this.buffer.fill(0);
        this.pos = 0;
      }
      ts64(this.buffer, 120, this.bytesRead / 536870912 | 0, this.bytesRead << 3);
      compress(this.hh, this.hl, this.buffer, 128);
      if (enc instanceof Uint8Array && enc.byteLength > 63) {
        for (let i = 0; i < 8; i++)
          ts64(enc, 8 * i + offset, this.hh[i], this.hl[i]);
        return enc;
      }
      const resultBuf = new Uint8Array(64);
      for (let i = 0; i < 8; i++)
        ts64(resultBuf, 8 * i, this.hh[i], this.hl[i]);
      if (typeof enc === "string") {
        return b4a.toString(resultBuf, enc);
      }
      return resultBuf;
    };
    function ts64(x, i, h, l) {
      x[i] = h >> 24 & 255;
      x[i + 1] = h >> 16 & 255;
      x[i + 2] = h >> 8 & 255;
      x[i + 3] = h & 255;
      x[i + 4] = l >> 24 & 255;
      x[i + 5] = l >> 16 & 255;
      x[i + 6] = l >> 8 & 255;
      x[i + 7] = l & 255;
    }
    function formatInput(input, enc) {
      var result = b4a.from(input, enc);
      return [result, result.byteLength];
    }
    function compress(hh, hl, m, n) {
      var wh = new Int32Array(16), wl = new Int32Array(16), bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i, j, h, l, a, b, c, d;
      var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
      var pos = 0;
      while (n >= 128) {
        for (i = 0; i < 16; i++) {
          j = 8 * i + pos;
          wh[i] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
          wl[i] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
        }
        for (i = 0; i < 80; i++) {
          bh0 = ah0;
          bh1 = ah1;
          bh2 = ah2;
          bh3 = ah3;
          bh4 = ah4;
          bh5 = ah5;
          bh6 = ah6;
          bh7 = ah7;
          bl0 = al0;
          bl1 = al1;
          bl2 = al2;
          bl3 = al3;
          bl4 = al4;
          bl5 = al5;
          bl6 = al6;
          bl7 = al7;
          h = ah7;
          l = al7;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
          l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          h = ah4 & ah5 ^ ~ah4 & ah6;
          l = al4 & al5 ^ ~al4 & al6;
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          h = K[i * 2];
          l = K[i * 2 + 1];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          h = wh[i % 16];
          l = wl[i % 16];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          th = c & 65535 | d << 16;
          tl = a & 65535 | b << 16;
          h = th;
          l = tl;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
          l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
          l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          bh7 = c & 65535 | d << 16;
          bl7 = a & 65535 | b << 16;
          h = bh3;
          l = bl3;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = th;
          l = tl;
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          bh3 = c & 65535 | d << 16;
          bl3 = a & 65535 | b << 16;
          ah1 = bh0;
          ah2 = bh1;
          ah3 = bh2;
          ah4 = bh3;
          ah5 = bh4;
          ah6 = bh5;
          ah7 = bh6;
          ah0 = bh7;
          al1 = bl0;
          al2 = bl1;
          al3 = bl2;
          al4 = bl3;
          al5 = bl4;
          al6 = bl5;
          al7 = bl6;
          al0 = bl7;
          if (i % 16 === 15) {
            for (j = 0; j < 16; j++) {
              h = wh[j];
              l = wl[j];
              a = l & 65535;
              b = l >>> 16;
              c = h & 65535;
              d = h >>> 16;
              h = wh[(j + 9) % 16];
              l = wl[(j + 9) % 16];
              a += l & 65535;
              b += l >>> 16;
              c += h & 65535;
              d += h >>> 16;
              th = wh[(j + 1) % 16];
              tl = wl[(j + 1) % 16];
              h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
              l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
              a += l & 65535;
              b += l >>> 16;
              c += h & 65535;
              d += h >>> 16;
              th = wh[(j + 14) % 16];
              tl = wl[(j + 14) % 16];
              h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
              l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
              a += l & 65535;
              b += l >>> 16;
              c += h & 65535;
              d += h >>> 16;
              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;
              wh[j] = c & 65535 | d << 16;
              wl[j] = a & 65535 | b << 16;
            }
          }
        }
        h = ah0;
        l = al0;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = hh[0];
        l = hl[0];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[0] = ah0 = c & 65535 | d << 16;
        hl[0] = al0 = a & 65535 | b << 16;
        h = ah1;
        l = al1;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = hh[1];
        l = hl[1];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[1] = ah1 = c & 65535 | d << 16;
        hl[1] = al1 = a & 65535 | b << 16;
        h = ah2;
        l = al2;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = hh[2];
        l = hl[2];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[2] = ah2 = c & 65535 | d << 16;
        hl[2] = al2 = a & 65535 | b << 16;
        h = ah3;
        l = al3;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = hh[3];
        l = hl[3];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[3] = ah3 = c & 65535 | d << 16;
        hl[3] = al3 = a & 65535 | b << 16;
        h = ah4;
        l = al4;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = hh[4];
        l = hl[4];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[4] = ah4 = c & 65535 | d << 16;
        hl[4] = al4 = a & 65535 | b << 16;
        h = ah5;
        l = al5;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = hh[5];
        l = hl[5];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[5] = ah5 = c & 65535 | d << 16;
        hl[5] = al5 = a & 65535 | b << 16;
        h = ah6;
        l = al6;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = hh[6];
        l = hl[6];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[6] = ah6 = c & 65535 | d << 16;
        hl[6] = al6 = a & 65535 | b << 16;
        h = ah7;
        l = al7;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d = h >>> 16;
        h = hh[7];
        l = hl[7];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[7] = ah7 = c & 65535 | d << 16;
        hl[7] = al7 = a & 65535 | b << 16;
        pos += 128;
        n -= 128;
      }
    }
    function HMAC(key) {
      if (!(this instanceof HMAC))
        return new HMAC(key);
      this.pad = b4a.alloc(128);
      this.inner = Sha512();
      this.outer = Sha512();
      const keyhash = b4a.alloc(64);
      if (key.byteLength > 128) {
        Sha512().update(key).digest(keyhash);
        key = keyhash;
      }
      this.pad.fill(54);
      for (let i = 0; i < key.byteLength; i++) {
        this.pad[i] ^= key[i];
      }
      this.inner.update(this.pad);
      this.pad.fill(92);
      for (let i = 0; i < key.byteLength; i++) {
        this.pad[i] ^= key[i];
      }
      this.outer.update(this.pad);
      this.pad.fill(0);
      keyhash.fill(0);
    }
    HMAC.prototype.update = function(input, enc) {
      this.inner.update(input, enc);
      return this;
    };
    HMAC.prototype.digest = function(enc, offset = 0) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc, offset);
    };
    Sha512.HMAC = HMAC;
  }
});

// node_modules/sha512-wasm/sha512.js
var require_sha5122 = __commonJS({
  "node_modules/sha512-wasm/sha512.js"(exports, module) {
    init_node_globals();
    var __commonJS2 = (cb, mod) => function __require2() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __toBinary = /* @__PURE__ */ (() => {
      var table = new Uint8Array(128);
      for (var i = 0; i < 64; i++)
        table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
      return (base64) => {
        var n = base64.length, bytes2 = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
        for (var i2 = 0, j = 0; i2 < n; ) {
          var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
          var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
          bytes2[j++] = c0 << 2 | c1 >> 4;
          bytes2[j++] = c1 << 4 | c2 >> 2;
          bytes2[j++] = c2 << 6 | c3;
        }
        return bytes2;
      };
    })();
    var require_sha5123 = __commonJS2({
      "wasm-binary:./sha512.wat"(exports2, module2) {
        module2.exports = __toBinary("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");
      }
    });
    var bytes = require_sha5123();
    var compiled = new WebAssembly.Module(bytes);
    module.exports = (imports) => {
      const instance = new WebAssembly.Instance(compiled, imports);
      return instance.exports;
    };
  }
});

// node_modules/sha512-wasm/index.js
var require_sha512_wasm = __commonJS({
  "node_modules/sha512-wasm/index.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var b4a = require_browser2();
    var wasm = require_sha5122()({
      imports: {
        debug: {
          log(...args) {
            console.log(...args.map((int) => (int >>> 0).toString(16).padStart(8, "0")));
          },
          log_tee(arg) {
            console.log((arg >>> 0).toString(16).padStart(8, "0"));
            return arg;
          }
        }
      }
    });
    var head = 0;
    var freeList = [];
    module.exports = Sha512;
    var SHA512_BYTES = module.exports.SHA512_BYTES = 64;
    var INPUT_OFFSET = 80;
    var STATEBYTES = 216;
    var BLOCKSIZE = 128;
    function Sha512() {
      if (!(this instanceof Sha512))
        return new Sha512();
      if (!wasm)
        throw new Error("WASM not loaded. Wait for Sha512.ready(cb)");
      if (!freeList.length) {
        freeList.push(head);
        head += STATEBYTES;
      }
      this.finalized = false;
      this.digestLength = SHA512_BYTES;
      this.pointer = freeList.pop();
      this.pos = 0;
      this.wasm = wasm;
      this._memory = new Uint8Array(wasm.memory.buffer);
      this._memory.fill(0, this.pointer, this.pointer + STATEBYTES);
      if (this.pointer + this.digestLength > this._memory.length)
        this._realloc(this.pointer + STATEBYTES);
    }
    Sha512.prototype._realloc = function(size) {
      wasm.memory.grow(Math.max(0, Math.ceil(Math.abs(size - this._memory.length) / 65536)));
      this._memory = new Uint8Array(wasm.memory.buffer);
    };
    Sha512.prototype.update = function(input, enc) {
      assert(this.finalized === false, "Hash instance finalized");
      if (head % 8 !== 0)
        head += 8 - head % 8;
      assert(head % 8 === 0, "input should be aligned for int64");
      const [inputBuf, length] = formatInput(input, enc);
      assert(inputBuf instanceof Uint8Array, "input must be Uint8Array or Buffer");
      if (head + input.length > this._memory.length)
        this._realloc(head + input.length);
      this._memory.fill(0, head, head + roundUp(length, BLOCKSIZE) - BLOCKSIZE);
      this._memory.set(inputBuf.subarray(0, BLOCKSIZE - this.pos), this.pointer + INPUT_OFFSET + this.pos);
      this._memory.set(inputBuf.subarray(BLOCKSIZE - this.pos), head);
      this.pos = this.pos + length & 127;
      wasm.sha512(this.pointer, head, length, 0);
      return this;
    };
    Sha512.prototype.digest = function(enc, offset = 0) {
      assert(this.finalized === false, "Hash instance finalized");
      this.finalized = true;
      freeList.push(this.pointer);
      const paddingStart = this.pointer + INPUT_OFFSET + this.pos;
      this._memory.fill(0, paddingStart, this.pointer + INPUT_OFFSET + BLOCKSIZE);
      wasm.sha512(this.pointer, head, 0, 1);
      const resultBuf = this._memory.subarray(this.pointer, this.pointer + this.digestLength);
      if (!enc) {
        return resultBuf;
      }
      if (typeof enc === "string") {
        return b4a.toString(resultBuf, enc);
      }
      assert(enc instanceof Uint8Array, "output must be Uint8Array or Buffer");
      assert(enc.byteLength >= this.digestLength + offset, "output must have at least 'SHA512_BYTES' bytes remaining");
      for (let i = 0; i < this.digestLength; i++) {
        enc[i + offset] = resultBuf[i];
      }
      return enc;
    };
    Sha512.WASM = wasm;
    Sha512.WASM_SUPPORTED = typeof WebAssembly !== "undefined";
    Sha512.ready = function(cb) {
      if (!cb)
        cb = noop;
      if (!wasm)
        return cb(new Error("WebAssembly not supported"));
      cb();
      return Promise.resolve();
    };
    Sha512.prototype.ready = Sha512.ready;
    function HMAC(key) {
      if (!(this instanceof HMAC))
        return new HMAC(key);
      this.pad = b4a.alloc(128);
      this.inner = Sha512();
      this.outer = Sha512();
      const keyhash = b4a.alloc(64);
      if (key.byteLength > 128) {
        Sha512().update(key).digest(keyhash);
        key = keyhash;
      }
      this.pad.fill(54);
      for (let i = 0; i < key.byteLength; i++) {
        this.pad[i] ^= key[i];
      }
      this.inner.update(this.pad);
      this.pad.fill(92);
      for (let i = 0; i < key.byteLength; i++) {
        this.pad[i] ^= key[i];
      }
      this.outer.update(this.pad);
      this.pad.fill(0);
      keyhash.fill(0);
    }
    HMAC.prototype.update = function(input, enc) {
      this.inner.update(input, enc);
      return this;
    };
    HMAC.prototype.digest = function(enc, offset = 0) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc, offset);
    };
    Sha512.HMAC = HMAC;
    function noop() {
    }
    function formatInput(input, enc) {
      var result = b4a.from(input, enc);
      return [result, result.byteLength];
    }
    function roundUp(n, base) {
      return n + base - 1 & -base;
    }
  }
});

// node_modules/sha512-universal/index.js
var require_sha512_universal = __commonJS({
  "node_modules/sha512-universal/index.js"(exports, module) {
    init_node_globals();
    var js = require_sha512();
    var wasm = require_sha512_wasm();
    var Proto = js;
    module.exports = function() {
      return new Proto();
    };
    module.exports.ready = function(cb) {
      wasm.ready(function() {
        cb();
      });
    };
    module.exports.WASM_SUPPORTED = wasm.SUPPORTED;
    module.exports.WASM_LOADED = false;
    var SHA512_BYTES = module.exports.SHA512_BYTES = 64;
    wasm.ready(function(err) {
      if (!err) {
        module.exports.WASM_LOADED = true;
        module.exports = Proto = wasm;
      }
    });
  }
});

// node_modules/sodium-javascript/crypto_auth.js
var require_crypto_auth = __commonJS({
  "node_modules/sodium-javascript/crypto_auth.js"(exports, module) {
    init_node_globals();
    var { crypto_verify_32 } = require_crypto_verify();
    var Sha512 = require_sha512_universal();
    var assert = require_nanoassert();
    var crypto_auth_BYTES = 32;
    var crypto_auth_KEYBYTES = 32;
    function crypto_auth(out, input, k) {
      assert(out.byteLength === crypto_auth_BYTES, "out should be 'crypto_auth_BYTES' in length");
      assert(k.byteLength === crypto_auth_KEYBYTES, "key should be 'crypto_auth_KEYBYTES' in length");
      const out0 = new Uint8Array(64);
      const hmac = Sha512.HMAC(k);
      hmac.update(input);
      hmac.digest(out0);
      out.set(out0.subarray(0, 32));
    }
    function crypto_auth_verify(h, input, k) {
      assert(h.byteLength === crypto_auth_BYTES, "h should be 'crypto_auth_BYTES' in length");
      assert(k.byteLength === crypto_auth_KEYBYTES, "key should be 'crypto_auth_KEYBYTES' in length");
      const correct = Sha512.HMAC(k).update(input).digest();
      return crypto_verify_32(h, 0, correct, 0);
    }
    module.exports = {
      crypto_auth_BYTES,
      crypto_auth_KEYBYTES,
      crypto_auth,
      crypto_auth_verify
    };
  }
});

// node_modules/sodium-javascript/crypto_hash.js
var require_crypto_hash = __commonJS({
  "node_modules/sodium-javascript/crypto_hash.js"(exports, module) {
    init_node_globals();
    var sha512 = require_sha512_universal();
    var assert = require_nanoassert();
    if (new Uint16Array([1])[0] !== 1)
      throw new Error("Big endian architecture is not supported.");
    var crypto_hash_sha512_BYTES = 64;
    var crypto_hash_BYTES = crypto_hash_sha512_BYTES;
    function crypto_hash_sha512(out, m, n) {
      assert(out.byteLength === crypto_hash_sha512_BYTES, "out must be 'crypto_hash_sha512_BYTES' bytes long");
      sha512().update(m.subarray(0, n)).digest(out);
      return 0;
    }
    function crypto_hash(out, m, n) {
      return crypto_hash_sha512(out, m, n);
    }
    module.exports = {
      crypto_hash,
      crypto_hash_sha512,
      crypto_hash_sha512_BYTES,
      crypto_hash_BYTES
    };
  }
});

// node_modules/sodium-javascript/internal/ed25519.js
var require_ed25519 = __commonJS({
  "node_modules/sodium-javascript/internal/ed25519.js"(exports, module) {
    init_node_globals();
    if (new Uint16Array([1])[0] !== 1)
      throw new Error("Big endian architecture is not supported.");
    var gf = function(init) {
      var i, r = new Float64Array(16);
      if (init)
        for (i = 0; i < init.length; i++)
          r[i] = init[i];
      return r;
    };
    var _0 = new Uint8Array(16);
    var _9 = new Uint8Array(32);
    _9[0] = 9;
    var gf0 = gf();
    var gf1 = gf([1]);
    var _121665 = gf([56129, 1]);
    var D = gf([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]);
    var D2 = gf([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]);
    var X = gf([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]);
    var Y = gf([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]);
    var I = gf([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    function A(o, a, b) {
      for (var i = 0; i < 16; i++)
        o[i] = a[i] + b[i];
    }
    function Z(o, a, b) {
      for (var i = 0; i < 16; i++)
        o[i] = a[i] - b[i];
    }
    function M(o, a, b) {
      var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
      v = a[0];
      t0 += v * b0;
      t1 += v * b1;
      t2 += v * b2;
      t3 += v * b3;
      t4 += v * b4;
      t5 += v * b5;
      t6 += v * b6;
      t7 += v * b7;
      t8 += v * b8;
      t9 += v * b9;
      t10 += v * b10;
      t11 += v * b11;
      t12 += v * b12;
      t13 += v * b13;
      t14 += v * b14;
      t15 += v * b15;
      v = a[1];
      t1 += v * b0;
      t2 += v * b1;
      t3 += v * b2;
      t4 += v * b3;
      t5 += v * b4;
      t6 += v * b5;
      t7 += v * b6;
      t8 += v * b7;
      t9 += v * b8;
      t10 += v * b9;
      t11 += v * b10;
      t12 += v * b11;
      t13 += v * b12;
      t14 += v * b13;
      t15 += v * b14;
      t16 += v * b15;
      v = a[2];
      t2 += v * b0;
      t3 += v * b1;
      t4 += v * b2;
      t5 += v * b3;
      t6 += v * b4;
      t7 += v * b5;
      t8 += v * b6;
      t9 += v * b7;
      t10 += v * b8;
      t11 += v * b9;
      t12 += v * b10;
      t13 += v * b11;
      t14 += v * b12;
      t15 += v * b13;
      t16 += v * b14;
      t17 += v * b15;
      v = a[3];
      t3 += v * b0;
      t4 += v * b1;
      t5 += v * b2;
      t6 += v * b3;
      t7 += v * b4;
      t8 += v * b5;
      t9 += v * b6;
      t10 += v * b7;
      t11 += v * b8;
      t12 += v * b9;
      t13 += v * b10;
      t14 += v * b11;
      t15 += v * b12;
      t16 += v * b13;
      t17 += v * b14;
      t18 += v * b15;
      v = a[4];
      t4 += v * b0;
      t5 += v * b1;
      t6 += v * b2;
      t7 += v * b3;
      t8 += v * b4;
      t9 += v * b5;
      t10 += v * b6;
      t11 += v * b7;
      t12 += v * b8;
      t13 += v * b9;
      t14 += v * b10;
      t15 += v * b11;
      t16 += v * b12;
      t17 += v * b13;
      t18 += v * b14;
      t19 += v * b15;
      v = a[5];
      t5 += v * b0;
      t6 += v * b1;
      t7 += v * b2;
      t8 += v * b3;
      t9 += v * b4;
      t10 += v * b5;
      t11 += v * b6;
      t12 += v * b7;
      t13 += v * b8;
      t14 += v * b9;
      t15 += v * b10;
      t16 += v * b11;
      t17 += v * b12;
      t18 += v * b13;
      t19 += v * b14;
      t20 += v * b15;
      v = a[6];
      t6 += v * b0;
      t7 += v * b1;
      t8 += v * b2;
      t9 += v * b3;
      t10 += v * b4;
      t11 += v * b5;
      t12 += v * b6;
      t13 += v * b7;
      t14 += v * b8;
      t15 += v * b9;
      t16 += v * b10;
      t17 += v * b11;
      t18 += v * b12;
      t19 += v * b13;
      t20 += v * b14;
      t21 += v * b15;
      v = a[7];
      t7 += v * b0;
      t8 += v * b1;
      t9 += v * b2;
      t10 += v * b3;
      t11 += v * b4;
      t12 += v * b5;
      t13 += v * b6;
      t14 += v * b7;
      t15 += v * b8;
      t16 += v * b9;
      t17 += v * b10;
      t18 += v * b11;
      t19 += v * b12;
      t20 += v * b13;
      t21 += v * b14;
      t22 += v * b15;
      v = a[8];
      t8 += v * b0;
      t9 += v * b1;
      t10 += v * b2;
      t11 += v * b3;
      t12 += v * b4;
      t13 += v * b5;
      t14 += v * b6;
      t15 += v * b7;
      t16 += v * b8;
      t17 += v * b9;
      t18 += v * b10;
      t19 += v * b11;
      t20 += v * b12;
      t21 += v * b13;
      t22 += v * b14;
      t23 += v * b15;
      v = a[9];
      t9 += v * b0;
      t10 += v * b1;
      t11 += v * b2;
      t12 += v * b3;
      t13 += v * b4;
      t14 += v * b5;
      t15 += v * b6;
      t16 += v * b7;
      t17 += v * b8;
      t18 += v * b9;
      t19 += v * b10;
      t20 += v * b11;
      t21 += v * b12;
      t22 += v * b13;
      t23 += v * b14;
      t24 += v * b15;
      v = a[10];
      t10 += v * b0;
      t11 += v * b1;
      t12 += v * b2;
      t13 += v * b3;
      t14 += v * b4;
      t15 += v * b5;
      t16 += v * b6;
      t17 += v * b7;
      t18 += v * b8;
      t19 += v * b9;
      t20 += v * b10;
      t21 += v * b11;
      t22 += v * b12;
      t23 += v * b13;
      t24 += v * b14;
      t25 += v * b15;
      v = a[11];
      t11 += v * b0;
      t12 += v * b1;
      t13 += v * b2;
      t14 += v * b3;
      t15 += v * b4;
      t16 += v * b5;
      t17 += v * b6;
      t18 += v * b7;
      t19 += v * b8;
      t20 += v * b9;
      t21 += v * b10;
      t22 += v * b11;
      t23 += v * b12;
      t24 += v * b13;
      t25 += v * b14;
      t26 += v * b15;
      v = a[12];
      t12 += v * b0;
      t13 += v * b1;
      t14 += v * b2;
      t15 += v * b3;
      t16 += v * b4;
      t17 += v * b5;
      t18 += v * b6;
      t19 += v * b7;
      t20 += v * b8;
      t21 += v * b9;
      t22 += v * b10;
      t23 += v * b11;
      t24 += v * b12;
      t25 += v * b13;
      t26 += v * b14;
      t27 += v * b15;
      v = a[13];
      t13 += v * b0;
      t14 += v * b1;
      t15 += v * b2;
      t16 += v * b3;
      t17 += v * b4;
      t18 += v * b5;
      t19 += v * b6;
      t20 += v * b7;
      t21 += v * b8;
      t22 += v * b9;
      t23 += v * b10;
      t24 += v * b11;
      t25 += v * b12;
      t26 += v * b13;
      t27 += v * b14;
      t28 += v * b15;
      v = a[14];
      t14 += v * b0;
      t15 += v * b1;
      t16 += v * b2;
      t17 += v * b3;
      t18 += v * b4;
      t19 += v * b5;
      t20 += v * b6;
      t21 += v * b7;
      t22 += v * b8;
      t23 += v * b9;
      t24 += v * b10;
      t25 += v * b11;
      t26 += v * b12;
      t27 += v * b13;
      t28 += v * b14;
      t29 += v * b15;
      v = a[15];
      t15 += v * b0;
      t16 += v * b1;
      t17 += v * b2;
      t18 += v * b3;
      t19 += v * b4;
      t20 += v * b5;
      t21 += v * b6;
      t22 += v * b7;
      t23 += v * b8;
      t24 += v * b9;
      t25 += v * b10;
      t26 += v * b11;
      t27 += v * b12;
      t28 += v * b13;
      t29 += v * b14;
      t30 += v * b15;
      t0 += 38 * t16;
      t1 += 38 * t17;
      t2 += 38 * t18;
      t3 += 38 * t19;
      t4 += 38 * t20;
      t5 += 38 * t21;
      t6 += 38 * t22;
      t7 += 38 * t23;
      t8 += 38 * t24;
      t9 += 38 * t25;
      t10 += 38 * t26;
      t11 += 38 * t27;
      t12 += 38 * t28;
      t13 += 38 * t29;
      t14 += 38 * t30;
      c = 1;
      v = t0 + c + 65535;
      c = Math.floor(v / 65536);
      t0 = v - c * 65536;
      v = t1 + c + 65535;
      c = Math.floor(v / 65536);
      t1 = v - c * 65536;
      v = t2 + c + 65535;
      c = Math.floor(v / 65536);
      t2 = v - c * 65536;
      v = t3 + c + 65535;
      c = Math.floor(v / 65536);
      t3 = v - c * 65536;
      v = t4 + c + 65535;
      c = Math.floor(v / 65536);
      t4 = v - c * 65536;
      v = t5 + c + 65535;
      c = Math.floor(v / 65536);
      t5 = v - c * 65536;
      v = t6 + c + 65535;
      c = Math.floor(v / 65536);
      t6 = v - c * 65536;
      v = t7 + c + 65535;
      c = Math.floor(v / 65536);
      t7 = v - c * 65536;
      v = t8 + c + 65535;
      c = Math.floor(v / 65536);
      t8 = v - c * 65536;
      v = t9 + c + 65535;
      c = Math.floor(v / 65536);
      t9 = v - c * 65536;
      v = t10 + c + 65535;
      c = Math.floor(v / 65536);
      t10 = v - c * 65536;
      v = t11 + c + 65535;
      c = Math.floor(v / 65536);
      t11 = v - c * 65536;
      v = t12 + c + 65535;
      c = Math.floor(v / 65536);
      t12 = v - c * 65536;
      v = t13 + c + 65535;
      c = Math.floor(v / 65536);
      t13 = v - c * 65536;
      v = t14 + c + 65535;
      c = Math.floor(v / 65536);
      t14 = v - c * 65536;
      v = t15 + c + 65535;
      c = Math.floor(v / 65536);
      t15 = v - c * 65536;
      t0 += c - 1 + 37 * (c - 1);
      c = 1;
      v = t0 + c + 65535;
      c = Math.floor(v / 65536);
      t0 = v - c * 65536;
      v = t1 + c + 65535;
      c = Math.floor(v / 65536);
      t1 = v - c * 65536;
      v = t2 + c + 65535;
      c = Math.floor(v / 65536);
      t2 = v - c * 65536;
      v = t3 + c + 65535;
      c = Math.floor(v / 65536);
      t3 = v - c * 65536;
      v = t4 + c + 65535;
      c = Math.floor(v / 65536);
      t4 = v - c * 65536;
      v = t5 + c + 65535;
      c = Math.floor(v / 65536);
      t5 = v - c * 65536;
      v = t6 + c + 65535;
      c = Math.floor(v / 65536);
      t6 = v - c * 65536;
      v = t7 + c + 65535;
      c = Math.floor(v / 65536);
      t7 = v - c * 65536;
      v = t8 + c + 65535;
      c = Math.floor(v / 65536);
      t8 = v - c * 65536;
      v = t9 + c + 65535;
      c = Math.floor(v / 65536);
      t9 = v - c * 65536;
      v = t10 + c + 65535;
      c = Math.floor(v / 65536);
      t10 = v - c * 65536;
      v = t11 + c + 65535;
      c = Math.floor(v / 65536);
      t11 = v - c * 65536;
      v = t12 + c + 65535;
      c = Math.floor(v / 65536);
      t12 = v - c * 65536;
      v = t13 + c + 65535;
      c = Math.floor(v / 65536);
      t13 = v - c * 65536;
      v = t14 + c + 65535;
      c = Math.floor(v / 65536);
      t14 = v - c * 65536;
      v = t15 + c + 65535;
      c = Math.floor(v / 65536);
      t15 = v - c * 65536;
      t0 += c - 1 + 37 * (c - 1);
      o[0] = t0;
      o[1] = t1;
      o[2] = t2;
      o[3] = t3;
      o[4] = t4;
      o[5] = t5;
      o[6] = t6;
      o[7] = t7;
      o[8] = t8;
      o[9] = t9;
      o[10] = t10;
      o[11] = t11;
      o[12] = t12;
      o[13] = t13;
      o[14] = t14;
      o[15] = t15;
    }
    function S(o, a) {
      M(o, a, a);
    }
    function sel25519(p, q, b) {
      var t, c = ~(b - 1);
      for (var i = 0; i < 16; i++) {
        t = c & (p[i] ^ q[i]);
        p[i] ^= t;
        q[i] ^= t;
      }
    }
    function pack25519(o, n) {
      var i, j, b;
      var m = gf(), t = gf();
      for (i = 0; i < 16; i++)
        t[i] = n[i];
      car25519(t);
      car25519(t);
      car25519(t);
      for (j = 0; j < 2; j++) {
        m[0] = t[0] - 65517;
        for (i = 1; i < 15; i++) {
          m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
          m[i - 1] &= 65535;
        }
        m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
        b = m[15] >> 16 & 1;
        m[14] &= 65535;
        sel25519(t, m, 1 - b);
      }
      for (i = 0; i < 16; i++) {
        o[2 * i] = t[i] & 255;
        o[2 * i + 1] = t[i] >> 8;
      }
    }
    function unpack25519(o, n) {
      var i;
      for (i = 0; i < 16; i++)
        o[i] = n[2 * i] + (n[2 * i + 1] << 8);
      o[15] &= 32767;
    }
    function inv25519(o, i) {
      var c = gf();
      var a;
      for (a = 0; a < 16; a++)
        c[a] = i[a];
      for (a = 253; a >= 0; a--) {
        S(c, c);
        if (a !== 2 && a !== 4)
          M(c, c, i);
      }
      for (a = 0; a < 16; a++)
        o[a] = c[a];
    }
    function car25519(o) {
      var i, v, c = 1;
      for (i = 0; i < 16; i++) {
        v = o[i] + c + 65535;
        c = Math.floor(v / 65536);
        o[i] = v - c * 65536;
      }
      o[0] += c - 1 + 37 * (c - 1);
    }
    module.exports = {
      gf,
      A,
      Z,
      M,
      S,
      sel25519,
      pack25519,
      unpack25519,
      inv25519,
      gf0,
      gf1,
      _9,
      _121665,
      D,
      D2,
      X,
      Y,
      I
    };
  }
});

// node_modules/sodium-javascript/crypto_scalarmult.js
var require_crypto_scalarmult = __commonJS({
  "node_modules/sodium-javascript/crypto_scalarmult.js"(exports, module) {
    init_node_globals();
    var { _9, _121665, gf, inv25519, pack25519, unpack25519, sel25519, A, M, Z, S } = require_ed25519();
    var crypto_scalarmult_BYTES = 32;
    var crypto_scalarmult_SCALARBYTES = 32;
    module.exports = {
      crypto_scalarmult,
      crypto_scalarmult_base,
      crypto_scalarmult_BYTES,
      crypto_scalarmult_SCALARBYTES
    };
    function crypto_scalarmult(q, n, p) {
      check(q, crypto_scalarmult_BYTES);
      check(n, crypto_scalarmult_SCALARBYTES);
      check(p, crypto_scalarmult_BYTES);
      var z = new Uint8Array(32);
      var x = new Float64Array(80), r, i;
      var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
      for (i = 0; i < 31; i++)
        z[i] = n[i];
      z[31] = n[31] & 127 | 64;
      z[0] &= 248;
      unpack25519(x, p);
      for (i = 0; i < 16; i++) {
        b[i] = x[i];
        d[i] = a[i] = c[i] = 0;
      }
      a[0] = d[0] = 1;
      for (i = 254; i >= 0; --i) {
        r = z[i >>> 3] >>> (i & 7) & 1;
        sel25519(a, b, r);
        sel25519(c, d, r);
        A(e, a, c);
        Z(a, a, c);
        A(c, b, d);
        Z(b, b, d);
        S(d, e);
        S(f, a);
        M(a, c, a);
        M(c, b, e);
        A(e, a, c);
        Z(a, a, c);
        S(b, a);
        Z(c, d, f);
        M(a, c, _121665);
        A(a, a, d);
        M(c, c, a);
        M(a, d, f);
        M(d, b, x);
        S(b, e);
        sel25519(a, b, r);
        sel25519(c, d, r);
      }
      for (i = 0; i < 16; i++) {
        x[i + 16] = a[i];
        x[i + 32] = c[i];
        x[i + 48] = b[i];
        x[i + 64] = d[i];
      }
      var x32 = x.subarray(32);
      var x16 = x.subarray(16);
      inv25519(x32, x32);
      M(x16, x16, x32);
      pack25519(q, x16);
      return 0;
    }
    function crypto_scalarmult_base(q, n) {
      return crypto_scalarmult(q, n, _9);
    }
    function check(buf, len) {
      if (!buf || len && buf.length < len)
        throw new Error("Argument must be a buffer" + (len ? " of length " + len : ""));
    }
  }
});

// node_modules/blake2b-wasm/blake2b.js
var require_blake2b = __commonJS({
  "node_modules/blake2b-wasm/blake2b.js"(exports, module) {
    init_node_globals();
    var __commonJS2 = (cb, mod) => function __require2() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __toBinary = /* @__PURE__ */ (() => {
      var table = new Uint8Array(128);
      for (var i = 0; i < 64; i++)
        table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
      return (base64) => {
        var n = base64.length, bytes2 = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
        for (var i2 = 0, j = 0; i2 < n; ) {
          var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
          var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
          bytes2[j++] = c0 << 2 | c1 >> 4;
          bytes2[j++] = c1 << 4 | c2 >> 2;
          bytes2[j++] = c2 << 6 | c3;
        }
        return bytes2;
      };
    })();
    var require_blake2b3 = __commonJS2({
      "wasm-binary:./blake2b.wat"(exports2, module2) {
        module2.exports = __toBinary("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");
      }
    });
    var bytes = require_blake2b3();
    var compiled = WebAssembly.compile(bytes);
    module.exports = async (imports) => {
      const instance = await WebAssembly.instantiate(await compiled, imports);
      return instance.exports;
    };
  }
});

// node_modules/blake2b-wasm/index.js
var require_blake2b_wasm = __commonJS({
  "node_modules/blake2b-wasm/index.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var b4a = require_browser2();
    var wasm = null;
    var wasmPromise = typeof WebAssembly !== "undefined" && require_blake2b()().then((mod) => {
      wasm = mod;
    });
    var head = 64;
    var freeList = [];
    module.exports = Blake2b;
    var BYTES_MIN = module.exports.BYTES_MIN = 16;
    var BYTES_MAX = module.exports.BYTES_MAX = 64;
    var BYTES = module.exports.BYTES = 32;
    var KEYBYTES_MIN = module.exports.KEYBYTES_MIN = 16;
    var KEYBYTES_MAX = module.exports.KEYBYTES_MAX = 64;
    var KEYBYTES = module.exports.KEYBYTES = 32;
    var SALTBYTES = module.exports.SALTBYTES = 16;
    var PERSONALBYTES = module.exports.PERSONALBYTES = 16;
    function Blake2b(digestLength, key, salt, personal, noAssert) {
      if (!(this instanceof Blake2b))
        return new Blake2b(digestLength, key, salt, personal, noAssert);
      if (!wasm)
        throw new Error("WASM not loaded. Wait for Blake2b.ready(cb)");
      if (!digestLength)
        digestLength = 32;
      if (noAssert !== true) {
        assert(digestLength >= BYTES_MIN, "digestLength must be at least " + BYTES_MIN + ", was given " + digestLength);
        assert(digestLength <= BYTES_MAX, "digestLength must be at most " + BYTES_MAX + ", was given " + digestLength);
        if (key != null) {
          assert(key instanceof Uint8Array, "key must be Uint8Array or Buffer");
          assert(key.length >= KEYBYTES_MIN, "key must be at least " + KEYBYTES_MIN + ", was given " + key.length);
          assert(key.length <= KEYBYTES_MAX, "key must be at least " + KEYBYTES_MAX + ", was given " + key.length);
        }
        if (salt != null) {
          assert(salt instanceof Uint8Array, "salt must be Uint8Array or Buffer");
          assert(salt.length === SALTBYTES, "salt must be exactly " + SALTBYTES + ", was given " + salt.length);
        }
        if (personal != null) {
          assert(personal instanceof Uint8Array, "personal must be Uint8Array or Buffer");
          assert(personal.length === PERSONALBYTES, "personal must be exactly " + PERSONALBYTES + ", was given " + personal.length);
        }
      }
      if (!freeList.length) {
        freeList.push(head);
        head += 216;
      }
      this.digestLength = digestLength;
      this.finalized = false;
      this.pointer = freeList.pop();
      this._memory = new Uint8Array(wasm.memory.buffer);
      this._memory.fill(0, 0, 64);
      this._memory[0] = this.digestLength;
      this._memory[1] = key ? key.length : 0;
      this._memory[2] = 1;
      this._memory[3] = 1;
      if (salt)
        this._memory.set(salt, 32);
      if (personal)
        this._memory.set(personal, 48);
      if (this.pointer + 216 > this._memory.length)
        this._realloc(this.pointer + 216);
      wasm.blake2b_init(this.pointer, this.digestLength);
      if (key) {
        this.update(key);
        this._memory.fill(0, head, head + key.length);
        this._memory[this.pointer + 200] = 128;
      }
    }
    Blake2b.prototype._realloc = function(size) {
      wasm.memory.grow(Math.max(0, Math.ceil(Math.abs(size - this._memory.length) / 65536)));
      this._memory = new Uint8Array(wasm.memory.buffer);
    };
    Blake2b.prototype.update = function(input) {
      assert(this.finalized === false, "Hash instance finalized");
      assert(input instanceof Uint8Array, "input must be Uint8Array or Buffer");
      if (head + input.length > this._memory.length)
        this._realloc(head + input.length);
      this._memory.set(input, head);
      wasm.blake2b_update(this.pointer, head, head + input.length);
      return this;
    };
    Blake2b.prototype.digest = function(enc) {
      assert(this.finalized === false, "Hash instance finalized");
      this.finalized = true;
      freeList.push(this.pointer);
      wasm.blake2b_final(this.pointer);
      if (!enc || enc === "binary") {
        return this._memory.slice(this.pointer + 128, this.pointer + 128 + this.digestLength);
      }
      if (typeof enc === "string") {
        return b4a.toString(this._memory, enc, this.pointer + 128, this.pointer + 128 + this.digestLength);
      }
      assert(enc instanceof Uint8Array && enc.length >= this.digestLength, "input must be Uint8Array or Buffer");
      for (var i = 0; i < this.digestLength; i++) {
        enc[i] = this._memory[this.pointer + 128 + i];
      }
      return enc;
    };
    Blake2b.prototype.final = Blake2b.prototype.digest;
    Blake2b.WASM = wasm;
    Blake2b.SUPPORTED = typeof WebAssembly !== "undefined";
    Blake2b.ready = function(cb) {
      if (!cb)
        cb = noop;
      if (!wasmPromise)
        return cb(new Error("WebAssembly not supported"));
      return wasmPromise.then(() => cb(), cb);
    };
    Blake2b.prototype.ready = Blake2b.ready;
    Blake2b.prototype.getPartialHash = function() {
      return this._memory.slice(this.pointer, this.pointer + 216);
    };
    Blake2b.prototype.setPartialHash = function(ph) {
      this._memory.set(ph, this.pointer);
    };
    function noop() {
    }
  }
});

// node_modules/blake2b/index.js
var require_blake2b2 = __commonJS({
  "node_modules/blake2b/index.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var b2wasm = require_blake2b_wasm();
    function ADD64AA(v2, a, b) {
      var o0 = v2[a] + v2[b];
      var o1 = v2[a + 1] + v2[b + 1];
      if (o0 >= 4294967296) {
        o1++;
      }
      v2[a] = o0;
      v2[a + 1] = o1;
    }
    function ADD64AC(v2, a, b0, b1) {
      var o0 = v2[a] + b0;
      if (b0 < 0) {
        o0 += 4294967296;
      }
      var o1 = v2[a + 1] + b1;
      if (o0 >= 4294967296) {
        o1++;
      }
      v2[a] = o0;
      v2[a + 1] = o1;
    }
    function B2B_GET32(arr, i) {
      return arr[i] ^ arr[i + 1] << 8 ^ arr[i + 2] << 16 ^ arr[i + 3] << 24;
    }
    function B2B_G(a, b, c, d, ix, iy) {
      var x0 = m[ix];
      var x1 = m[ix + 1];
      var y0 = m[iy];
      var y1 = m[iy + 1];
      ADD64AA(v, a, b);
      ADD64AC(v, a, x0, x1);
      var xor0 = v[d] ^ v[a];
      var xor1 = v[d + 1] ^ v[a + 1];
      v[d] = xor1;
      v[d + 1] = xor0;
      ADD64AA(v, c, d);
      xor0 = v[b] ^ v[c];
      xor1 = v[b + 1] ^ v[c + 1];
      v[b] = xor0 >>> 24 ^ xor1 << 8;
      v[b + 1] = xor1 >>> 24 ^ xor0 << 8;
      ADD64AA(v, a, b);
      ADD64AC(v, a, y0, y1);
      xor0 = v[d] ^ v[a];
      xor1 = v[d + 1] ^ v[a + 1];
      v[d] = xor0 >>> 16 ^ xor1 << 16;
      v[d + 1] = xor1 >>> 16 ^ xor0 << 16;
      ADD64AA(v, c, d);
      xor0 = v[b] ^ v[c];
      xor1 = v[b + 1] ^ v[c + 1];
      v[b] = xor1 >>> 31 ^ xor0 << 1;
      v[b + 1] = xor0 >>> 31 ^ xor1 << 1;
    }
    var BLAKE2B_IV32 = new Uint32Array([
      4089235720,
      1779033703,
      2227873595,
      3144134277,
      4271175723,
      1013904242,
      1595750129,
      2773480762,
      2917565137,
      1359893119,
      725511199,
      2600822924,
      4215389547,
      528734635,
      327033209,
      1541459225
    ]);
    var SIGMA8 = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9,
      12,
      5,
      1,
      15,
      14,
      13,
      4,
      10,
      0,
      7,
      6,
      3,
      9,
      2,
      8,
      11,
      13,
      11,
      7,
      14,
      12,
      1,
      3,
      9,
      5,
      0,
      15,
      4,
      8,
      6,
      2,
      10,
      6,
      15,
      14,
      9,
      11,
      3,
      0,
      8,
      12,
      2,
      13,
      7,
      1,
      4,
      10,
      5,
      10,
      2,
      8,
      4,
      7,
      6,
      1,
      5,
      15,
      11,
      9,
      14,
      3,
      12,
      13,
      0,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3
    ];
    var SIGMA82 = new Uint8Array(SIGMA8.map(function(x) {
      return x * 2;
    }));
    var v = new Uint32Array(32);
    var m = new Uint32Array(32);
    function blake2bCompress(ctx, last) {
      var i = 0;
      for (i = 0; i < 16; i++) {
        v[i] = ctx.h[i];
        v[i + 16] = BLAKE2B_IV32[i];
      }
      v[24] = v[24] ^ ctx.t;
      v[25] = v[25] ^ ctx.t / 4294967296;
      if (last) {
        v[28] = ~v[28];
        v[29] = ~v[29];
      }
      for (i = 0; i < 32; i++) {
        m[i] = B2B_GET32(ctx.b, 4 * i);
      }
      for (i = 0; i < 12; i++) {
        B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
        B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
        B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
        B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
        B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
        B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
        B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
        B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
      }
      for (i = 0; i < 16; i++) {
        ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
      }
    }
    var parameter_block = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]);
    function Blake2b(outlen, key, salt, personal) {
      parameter_block.fill(0);
      this.b = new Uint8Array(128);
      this.h = new Uint32Array(16);
      this.t = 0;
      this.c = 0;
      this.outlen = outlen;
      parameter_block[0] = outlen;
      if (key)
        parameter_block[1] = key.length;
      parameter_block[2] = 1;
      parameter_block[3] = 1;
      if (salt)
        parameter_block.set(salt, 32);
      if (personal)
        parameter_block.set(personal, 48);
      for (var i = 0; i < 16; i++) {
        this.h[i] = BLAKE2B_IV32[i] ^ B2B_GET32(parameter_block, i * 4);
      }
      if (key) {
        blake2bUpdate(this, key);
        this.c = 128;
      }
    }
    Blake2b.prototype.update = function(input) {
      assert(input instanceof Uint8Array, "input must be Uint8Array or Buffer");
      blake2bUpdate(this, input);
      return this;
    };
    Blake2b.prototype.digest = function(out) {
      var buf = !out || out === "binary" || out === "hex" ? new Uint8Array(this.outlen) : out;
      assert(buf instanceof Uint8Array, 'out must be "binary", "hex", Uint8Array, or Buffer');
      assert(buf.length >= this.outlen, "out must have at least outlen bytes of space");
      blake2bFinal(this, buf);
      if (out === "hex")
        return hexSlice(buf);
      return buf;
    };
    Blake2b.prototype.final = Blake2b.prototype.digest;
    Blake2b.ready = function(cb) {
      b2wasm.ready(function() {
        cb();
      });
    };
    function blake2bUpdate(ctx, input) {
      for (var i = 0; i < input.length; i++) {
        if (ctx.c === 128) {
          ctx.t += ctx.c;
          blake2bCompress(ctx, false);
          ctx.c = 0;
        }
        ctx.b[ctx.c++] = input[i];
      }
    }
    function blake2bFinal(ctx, out) {
      ctx.t += ctx.c;
      while (ctx.c < 128) {
        ctx.b[ctx.c++] = 0;
      }
      blake2bCompress(ctx, true);
      for (var i = 0; i < ctx.outlen; i++) {
        out[i] = ctx.h[i >> 2] >> 8 * (i & 3);
      }
      return out;
    }
    function hexSlice(buf) {
      var str = "";
      for (var i = 0; i < buf.length; i++)
        str += toHex(buf[i]);
      return str;
    }
    function toHex(n) {
      if (n < 16)
        return "0" + n.toString(16);
      return n.toString(16);
    }
    var Proto = Blake2b;
    module.exports = function createHash(outlen, key, salt, personal, noAssert) {
      if (noAssert !== true) {
        assert(outlen >= BYTES_MIN, "outlen must be at least " + BYTES_MIN + ", was given " + outlen);
        assert(outlen <= BYTES_MAX, "outlen must be at most " + BYTES_MAX + ", was given " + outlen);
        if (key != null) {
          assert(key instanceof Uint8Array, "key must be Uint8Array or Buffer");
          assert(key.length >= KEYBYTES_MIN, "key must be at least " + KEYBYTES_MIN + ", was given " + key.length);
          assert(key.length <= KEYBYTES_MAX, "key must be at most " + KEYBYTES_MAX + ", was given " + key.length);
        }
        if (salt != null) {
          assert(salt instanceof Uint8Array, "salt must be Uint8Array or Buffer");
          assert(salt.length === SALTBYTES, "salt must be exactly " + SALTBYTES + ", was given " + salt.length);
        }
        if (personal != null) {
          assert(personal instanceof Uint8Array, "personal must be Uint8Array or Buffer");
          assert(personal.length === PERSONALBYTES, "personal must be exactly " + PERSONALBYTES + ", was given " + personal.length);
        }
      }
      return new Proto(outlen, key, salt, personal);
    };
    module.exports.ready = function(cb) {
      b2wasm.ready(function() {
        cb();
      });
    };
    module.exports.WASM_SUPPORTED = b2wasm.SUPPORTED;
    module.exports.WASM_LOADED = false;
    var BYTES_MIN = module.exports.BYTES_MIN = 16;
    var BYTES_MAX = module.exports.BYTES_MAX = 64;
    var BYTES = module.exports.BYTES = 32;
    var KEYBYTES_MIN = module.exports.KEYBYTES_MIN = 16;
    var KEYBYTES_MAX = module.exports.KEYBYTES_MAX = 64;
    var KEYBYTES = module.exports.KEYBYTES = 32;
    var SALTBYTES = module.exports.SALTBYTES = 16;
    var PERSONALBYTES = module.exports.PERSONALBYTES = 16;
    b2wasm.ready(function(err) {
      if (!err) {
        module.exports.WASM_LOADED = true;
        module.exports = b2wasm;
      }
    });
  }
});

// node_modules/sodium-javascript/crypto_generichash.js
var require_crypto_generichash = __commonJS({
  "node_modules/sodium-javascript/crypto_generichash.js"(exports, module) {
    init_node_globals();
    var blake2b = require_blake2b2();
    if (new Uint16Array([1])[0] !== 1)
      throw new Error("Big endian architecture is not supported.");
    module.exports.crypto_generichash_PRIMITIVE = "blake2b";
    module.exports.crypto_generichash_BYTES_MIN = blake2b.BYTES_MIN;
    module.exports.crypto_generichash_BYTES_MAX = blake2b.BYTES_MAX;
    module.exports.crypto_generichash_BYTES = blake2b.BYTES;
    module.exports.crypto_generichash_KEYBYTES_MIN = blake2b.KEYBYTES_MIN;
    module.exports.crypto_generichash_KEYBYTES_MAX = blake2b.KEYBYTES_MAX;
    module.exports.crypto_generichash_KEYBYTES = blake2b.KEYBYTES;
    module.exports.crypto_generichash_WASM_SUPPORTED = blake2b.WASM_SUPPORTED;
    module.exports.crypto_generichash_WASM_LOADED = false;
    module.exports.crypto_generichash = function(output, input, key) {
      blake2b(output.length, key).update(input).final(output);
    };
    module.exports.crypto_generichash_ready = blake2b.ready;
    module.exports.crypto_generichash_batch = function(output, inputArray, key) {
      var ctx = blake2b(output.length, key);
      for (var i = 0; i < inputArray.length; i++) {
        ctx.update(inputArray[i]);
      }
      ctx.final(output);
    };
    module.exports.crypto_generichash_instance = function(key, outlen) {
      if (outlen == null)
        outlen = module.exports.crypto_generichash_BYTES;
      return blake2b(outlen, key);
    };
    blake2b.ready(function(_) {
      module.exports.crypto_generichash_WASM_LOADED = blake2b.WASM_LOADED;
    });
  }
});

// node_modules/xsalsa20/xsalsa20.js
var require_xsalsa20 = __commonJS({
  "node_modules/xsalsa20/xsalsa20.js"(exports, module) {
    init_node_globals();
    var __commonJS2 = (cb, mod) => function __require2() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __toBinary = /* @__PURE__ */ (() => {
      var table = new Uint8Array(128);
      for (var i = 0; i < 64; i++)
        table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
      return (base64) => {
        var n = base64.length, bytes2 = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
        for (var i2 = 0, j = 0; i2 < n; ) {
          var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
          var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
          bytes2[j++] = c0 << 2 | c1 >> 4;
          bytes2[j++] = c1 << 4 | c2 >> 2;
          bytes2[j++] = c2 << 6 | c3;
        }
        return bytes2;
      };
    })();
    var require_xsalsa203 = __commonJS2({
      "wasm-binary:./xsalsa20.wat"(exports2, module2) {
        module2.exports = __toBinary("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");
      }
    });
    var bytes = require_xsalsa203();
    var compiled = new WebAssembly.Module(bytes);
    module.exports = (imports) => {
      const instance = new WebAssembly.Instance(compiled, imports);
      return instance.exports;
    };
  }
});

// node_modules/xsalsa20/index.js
var require_xsalsa202 = __commonJS({
  "node_modules/xsalsa20/index.js"(exports, module) {
    init_node_globals();
    var xsalsa20 = typeof WebAssembly !== "undefined" && require_xsalsa20()();
    var SIGMA = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
    var head = 144;
    var top = head;
    var free = [];
    module.exports = XSalsa20;
    XSalsa20.NONCEBYTES = 24;
    XSalsa20.KEYBYTES = 32;
    XSalsa20.core_hsalsa20 = core_hsalsa20;
    XSalsa20.SIGMA = SIGMA;
    function XSalsa20(nonce, key) {
      if (!(this instanceof XSalsa20))
        return new XSalsa20(nonce, key);
      if (!nonce || nonce.length < 24)
        throw new Error("nonce must be at least 24 bytes");
      if (!key || key.length < 32)
        throw new Error("key must be at least 32 bytes");
      this._xor = xsalsa20 ? new WASM(nonce, key) : new Fallback(nonce, key);
    }
    XSalsa20.prototype.update = function(input, output) {
      if (!input)
        throw new Error("input must be Uint8Array or Buffer");
      if (!output)
        output = new Uint8Array(input.length);
      if (input.length)
        this._xor.update(input, output);
      return output;
    };
    XSalsa20.prototype.final = XSalsa20.prototype.finalize = function() {
      this._xor.finalize();
      this._xor = null;
    };
    function WASM(nonce, key) {
      if (!free.length) {
        free.push(head);
        head += 64;
      }
      this._pointer = free.pop();
      this._nonce = this._pointer + 8;
      this._key = this._nonce + 24;
      this._overflow = 0;
      this._memory = new Uint8Array(xsalsa20.memory.buffer);
      this._memory.fill(0, this._pointer, this._pointer + 8);
      this._memory.set(nonce, this._nonce);
      this._memory.set(key, this._key);
    }
    WASM.prototype.realloc = function(size) {
      xsalsa20.memory.grow(Math.ceil(Math.abs(size - this._memory.length) / 65536));
      this._memory = new Uint8Array(xsalsa20.memory.buffer);
    };
    WASM.prototype.update = function(input, output) {
      var len = this._overflow + input.length;
      var start = head + this._overflow;
      top = head + len;
      if (top >= this._memory.length)
        this.realloc(top);
      this._memory.set(input, start);
      xsalsa20.xsalsa20_xor(this._pointer, head, head, len, this._nonce, this._key);
      output.set(this._memory.subarray(start, head + len));
      this._overflow = len & 63;
    };
    WASM.prototype.finalize = function() {
      this._memory.fill(0, this._pointer, this._key + 32);
      if (top > head) {
        this._memory.fill(0, head, top);
        top = 0;
      }
      free.push(this._pointer);
    };
    function Fallback(nonce, key) {
      this._s = new Uint8Array(32);
      this._z = new Uint8Array(16);
      this._overflow = 0;
      core_hsalsa20(this._s, nonce, key, SIGMA);
      for (var i = 0; i < 8; i++)
        this._z[i] = nonce[i + 16];
    }
    Fallback.prototype.update = function(input, output) {
      var x = new Uint8Array(64);
      var u = 0;
      var i = this._overflow;
      var b = input.length + this._overflow;
      var z = this._z;
      var mpos = -this._overflow;
      var cpos = -this._overflow;
      while (b >= 64) {
        core_salsa20(x, z, this._s, SIGMA);
        for (; i < 64; i++)
          output[cpos + i] = input[mpos + i] ^ x[i];
        u = 1;
        for (i = 8; i < 16; i++) {
          u += z[i] & 255 | 0;
          z[i] = u & 255;
          u >>>= 8;
        }
        b -= 64;
        cpos += 64;
        mpos += 64;
        i = 0;
      }
      if (b > 0) {
        core_salsa20(x, z, this._s, SIGMA);
        for (; i < b; i++)
          output[cpos + i] = input[mpos + i] ^ x[i];
      }
      this._overflow = b & 63;
    };
    Fallback.prototype.finalize = function() {
      this._s.fill(0);
      this._z.fill(0);
    };
    function core_salsa20(o, p, k, c) {
      var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
      var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
      for (var i = 0; i < 20; i += 2) {
        u = x0 + x12 | 0;
        x4 ^= u << 7 | u >>> 25;
        u = x4 + x0 | 0;
        x8 ^= u << 9 | u >>> 23;
        u = x8 + x4 | 0;
        x12 ^= u << 13 | u >>> 19;
        u = x12 + x8 | 0;
        x0 ^= u << 18 | u >>> 14;
        u = x5 + x1 | 0;
        x9 ^= u << 7 | u >>> 25;
        u = x9 + x5 | 0;
        x13 ^= u << 9 | u >>> 23;
        u = x13 + x9 | 0;
        x1 ^= u << 13 | u >>> 19;
        u = x1 + x13 | 0;
        x5 ^= u << 18 | u >>> 14;
        u = x10 + x6 | 0;
        x14 ^= u << 7 | u >>> 25;
        u = x14 + x10 | 0;
        x2 ^= u << 9 | u >>> 23;
        u = x2 + x14 | 0;
        x6 ^= u << 13 | u >>> 19;
        u = x6 + x2 | 0;
        x10 ^= u << 18 | u >>> 14;
        u = x15 + x11 | 0;
        x3 ^= u << 7 | u >>> 25;
        u = x3 + x15 | 0;
        x7 ^= u << 9 | u >>> 23;
        u = x7 + x3 | 0;
        x11 ^= u << 13 | u >>> 19;
        u = x11 + x7 | 0;
        x15 ^= u << 18 | u >>> 14;
        u = x0 + x3 | 0;
        x1 ^= u << 7 | u >>> 25;
        u = x1 + x0 | 0;
        x2 ^= u << 9 | u >>> 23;
        u = x2 + x1 | 0;
        x3 ^= u << 13 | u >>> 19;
        u = x3 + x2 | 0;
        x0 ^= u << 18 | u >>> 14;
        u = x5 + x4 | 0;
        x6 ^= u << 7 | u >>> 25;
        u = x6 + x5 | 0;
        x7 ^= u << 9 | u >>> 23;
        u = x7 + x6 | 0;
        x4 ^= u << 13 | u >>> 19;
        u = x4 + x7 | 0;
        x5 ^= u << 18 | u >>> 14;
        u = x10 + x9 | 0;
        x11 ^= u << 7 | u >>> 25;
        u = x11 + x10 | 0;
        x8 ^= u << 9 | u >>> 23;
        u = x8 + x11 | 0;
        x9 ^= u << 13 | u >>> 19;
        u = x9 + x8 | 0;
        x10 ^= u << 18 | u >>> 14;
        u = x15 + x14 | 0;
        x12 ^= u << 7 | u >>> 25;
        u = x12 + x15 | 0;
        x13 ^= u << 9 | u >>> 23;
        u = x13 + x12 | 0;
        x14 ^= u << 13 | u >>> 19;
        u = x14 + x13 | 0;
        x15 ^= u << 18 | u >>> 14;
      }
      x0 = x0 + j0 | 0;
      x1 = x1 + j1 | 0;
      x2 = x2 + j2 | 0;
      x3 = x3 + j3 | 0;
      x4 = x4 + j4 | 0;
      x5 = x5 + j5 | 0;
      x6 = x6 + j6 | 0;
      x7 = x7 + j7 | 0;
      x8 = x8 + j8 | 0;
      x9 = x9 + j9 | 0;
      x10 = x10 + j10 | 0;
      x11 = x11 + j11 | 0;
      x12 = x12 + j12 | 0;
      x13 = x13 + j13 | 0;
      x14 = x14 + j14 | 0;
      x15 = x15 + j15 | 0;
      o[0] = x0 >>> 0 & 255;
      o[1] = x0 >>> 8 & 255;
      o[2] = x0 >>> 16 & 255;
      o[3] = x0 >>> 24 & 255;
      o[4] = x1 >>> 0 & 255;
      o[5] = x1 >>> 8 & 255;
      o[6] = x1 >>> 16 & 255;
      o[7] = x1 >>> 24 & 255;
      o[8] = x2 >>> 0 & 255;
      o[9] = x2 >>> 8 & 255;
      o[10] = x2 >>> 16 & 255;
      o[11] = x2 >>> 24 & 255;
      o[12] = x3 >>> 0 & 255;
      o[13] = x3 >>> 8 & 255;
      o[14] = x3 >>> 16 & 255;
      o[15] = x3 >>> 24 & 255;
      o[16] = x4 >>> 0 & 255;
      o[17] = x4 >>> 8 & 255;
      o[18] = x4 >>> 16 & 255;
      o[19] = x4 >>> 24 & 255;
      o[20] = x5 >>> 0 & 255;
      o[21] = x5 >>> 8 & 255;
      o[22] = x5 >>> 16 & 255;
      o[23] = x5 >>> 24 & 255;
      o[24] = x6 >>> 0 & 255;
      o[25] = x6 >>> 8 & 255;
      o[26] = x6 >>> 16 & 255;
      o[27] = x6 >>> 24 & 255;
      o[28] = x7 >>> 0 & 255;
      o[29] = x7 >>> 8 & 255;
      o[30] = x7 >>> 16 & 255;
      o[31] = x7 >>> 24 & 255;
      o[32] = x8 >>> 0 & 255;
      o[33] = x8 >>> 8 & 255;
      o[34] = x8 >>> 16 & 255;
      o[35] = x8 >>> 24 & 255;
      o[36] = x9 >>> 0 & 255;
      o[37] = x9 >>> 8 & 255;
      o[38] = x9 >>> 16 & 255;
      o[39] = x9 >>> 24 & 255;
      o[40] = x10 >>> 0 & 255;
      o[41] = x10 >>> 8 & 255;
      o[42] = x10 >>> 16 & 255;
      o[43] = x10 >>> 24 & 255;
      o[44] = x11 >>> 0 & 255;
      o[45] = x11 >>> 8 & 255;
      o[46] = x11 >>> 16 & 255;
      o[47] = x11 >>> 24 & 255;
      o[48] = x12 >>> 0 & 255;
      o[49] = x12 >>> 8 & 255;
      o[50] = x12 >>> 16 & 255;
      o[51] = x12 >>> 24 & 255;
      o[52] = x13 >>> 0 & 255;
      o[53] = x13 >>> 8 & 255;
      o[54] = x13 >>> 16 & 255;
      o[55] = x13 >>> 24 & 255;
      o[56] = x14 >>> 0 & 255;
      o[57] = x14 >>> 8 & 255;
      o[58] = x14 >>> 16 & 255;
      o[59] = x14 >>> 24 & 255;
      o[60] = x15 >>> 0 & 255;
      o[61] = x15 >>> 8 & 255;
      o[62] = x15 >>> 16 & 255;
      o[63] = x15 >>> 24 & 255;
    }
    function core_hsalsa20(o, p, k, c) {
      var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
      var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
      for (var i = 0; i < 20; i += 2) {
        u = x0 + x12 | 0;
        x4 ^= u << 7 | u >>> 25;
        u = x4 + x0 | 0;
        x8 ^= u << 9 | u >>> 23;
        u = x8 + x4 | 0;
        x12 ^= u << 13 | u >>> 19;
        u = x12 + x8 | 0;
        x0 ^= u << 18 | u >>> 14;
        u = x5 + x1 | 0;
        x9 ^= u << 7 | u >>> 25;
        u = x9 + x5 | 0;
        x13 ^= u << 9 | u >>> 23;
        u = x13 + x9 | 0;
        x1 ^= u << 13 | u >>> 19;
        u = x1 + x13 | 0;
        x5 ^= u << 18 | u >>> 14;
        u = x10 + x6 | 0;
        x14 ^= u << 7 | u >>> 25;
        u = x14 + x10 | 0;
        x2 ^= u << 9 | u >>> 23;
        u = x2 + x14 | 0;
        x6 ^= u << 13 | u >>> 19;
        u = x6 + x2 | 0;
        x10 ^= u << 18 | u >>> 14;
        u = x15 + x11 | 0;
        x3 ^= u << 7 | u >>> 25;
        u = x3 + x15 | 0;
        x7 ^= u << 9 | u >>> 23;
        u = x7 + x3 | 0;
        x11 ^= u << 13 | u >>> 19;
        u = x11 + x7 | 0;
        x15 ^= u << 18 | u >>> 14;
        u = x0 + x3 | 0;
        x1 ^= u << 7 | u >>> 25;
        u = x1 + x0 | 0;
        x2 ^= u << 9 | u >>> 23;
        u = x2 + x1 | 0;
        x3 ^= u << 13 | u >>> 19;
        u = x3 + x2 | 0;
        x0 ^= u << 18 | u >>> 14;
        u = x5 + x4 | 0;
        x6 ^= u << 7 | u >>> 25;
        u = x6 + x5 | 0;
        x7 ^= u << 9 | u >>> 23;
        u = x7 + x6 | 0;
        x4 ^= u << 13 | u >>> 19;
        u = x4 + x7 | 0;
        x5 ^= u << 18 | u >>> 14;
        u = x10 + x9 | 0;
        x11 ^= u << 7 | u >>> 25;
        u = x11 + x10 | 0;
        x8 ^= u << 9 | u >>> 23;
        u = x8 + x11 | 0;
        x9 ^= u << 13 | u >>> 19;
        u = x9 + x8 | 0;
        x10 ^= u << 18 | u >>> 14;
        u = x15 + x14 | 0;
        x12 ^= u << 7 | u >>> 25;
        u = x12 + x15 | 0;
        x13 ^= u << 9 | u >>> 23;
        u = x13 + x12 | 0;
        x14 ^= u << 13 | u >>> 19;
        u = x14 + x13 | 0;
        x15 ^= u << 18 | u >>> 14;
      }
      o[0] = x0 >>> 0 & 255;
      o[1] = x0 >>> 8 & 255;
      o[2] = x0 >>> 16 & 255;
      o[3] = x0 >>> 24 & 255;
      o[4] = x5 >>> 0 & 255;
      o[5] = x5 >>> 8 & 255;
      o[6] = x5 >>> 16 & 255;
      o[7] = x5 >>> 24 & 255;
      o[8] = x10 >>> 0 & 255;
      o[9] = x10 >>> 8 & 255;
      o[10] = x10 >>> 16 & 255;
      o[11] = x10 >>> 24 & 255;
      o[12] = x15 >>> 0 & 255;
      o[13] = x15 >>> 8 & 255;
      o[14] = x15 >>> 16 & 255;
      o[15] = x15 >>> 24 & 255;
      o[16] = x6 >>> 0 & 255;
      o[17] = x6 >>> 8 & 255;
      o[18] = x6 >>> 16 & 255;
      o[19] = x6 >>> 24 & 255;
      o[20] = x7 >>> 0 & 255;
      o[21] = x7 >>> 8 & 255;
      o[22] = x7 >>> 16 & 255;
      o[23] = x7 >>> 24 & 255;
      o[24] = x8 >>> 0 & 255;
      o[25] = x8 >>> 8 & 255;
      o[26] = x8 >>> 16 & 255;
      o[27] = x8 >>> 24 & 255;
      o[28] = x9 >>> 0 & 255;
      o[29] = x9 >>> 8 & 255;
      o[30] = x9 >>> 16 & 255;
      o[31] = x9 >>> 24 & 255;
    }
  }
});

// node_modules/sodium-javascript/crypto_stream.js
var require_crypto_stream = __commonJS({
  "node_modules/sodium-javascript/crypto_stream.js"(exports) {
    init_node_globals();
    var xsalsa20 = require_xsalsa202();
    if (new Uint16Array([1])[0] !== 1)
      throw new Error("Big endian architecture is not supported.");
    exports.crypto_stream_KEYBYTES = 32;
    exports.crypto_stream_NONCEBYTES = 24;
    exports.crypto_stream_PRIMITIVE = "xsalsa20";
    exports.crypto_stream_xsalsa20_MESSAGEBYTES_MAX = Number.MAX_SAFE_INTEGER;
    exports.crypto_stream = function(c, nonce, key) {
      c.fill(0);
      exports.crypto_stream_xor(c, c, nonce, key);
    };
    exports.crypto_stream_xor = function(c, m, nonce, key) {
      const xor = xsalsa20(nonce, key);
      xor.update(m, c);
      xor.final();
    };
    exports.crypto_stream_xor_instance = function(nonce, key) {
      return new XOR(nonce, key);
    };
    function XOR(nonce, key) {
      this._instance = xsalsa20(nonce, key);
    }
    XOR.prototype.update = function(out, inp) {
      this._instance.update(inp, out);
    };
    XOR.prototype.final = function() {
      this._instance.finalize();
      this._instance = null;
    };
  }
});

// node_modules/sodium-javascript/internal/poly1305.js
var require_poly1305 = __commonJS({
  "node_modules/sodium-javascript/internal/poly1305.js"(exports, module) {
    init_node_globals();
    if (new Uint16Array([1])[0] !== 1)
      throw new Error("Big endian architecture is not supported.");
    var poly1305 = function(key) {
      this.buffer = new Uint8Array(16);
      this.r = new Uint16Array(10);
      this.h = new Uint16Array(10);
      this.pad = new Uint16Array(8);
      this.leftover = 0;
      this.fin = 0;
      var t0, t1, t2, t3, t4, t5, t6, t7;
      t0 = key[0] & 255 | (key[1] & 255) << 8;
      this.r[0] = t0 & 8191;
      t1 = key[2] & 255 | (key[3] & 255) << 8;
      this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
      t2 = key[4] & 255 | (key[5] & 255) << 8;
      this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
      t3 = key[6] & 255 | (key[7] & 255) << 8;
      this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
      t4 = key[8] & 255 | (key[9] & 255) << 8;
      this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
      this.r[5] = t4 >>> 1 & 8190;
      t5 = key[10] & 255 | (key[11] & 255) << 8;
      this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
      t6 = key[12] & 255 | (key[13] & 255) << 8;
      this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
      t7 = key[14] & 255 | (key[15] & 255) << 8;
      this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
      this.r[9] = t7 >>> 5 & 127;
      this.pad[0] = key[16] & 255 | (key[17] & 255) << 8;
      this.pad[1] = key[18] & 255 | (key[19] & 255) << 8;
      this.pad[2] = key[20] & 255 | (key[21] & 255) << 8;
      this.pad[3] = key[22] & 255 | (key[23] & 255) << 8;
      this.pad[4] = key[24] & 255 | (key[25] & 255) << 8;
      this.pad[5] = key[26] & 255 | (key[27] & 255) << 8;
      this.pad[6] = key[28] & 255 | (key[29] & 255) << 8;
      this.pad[7] = key[30] & 255 | (key[31] & 255) << 8;
    };
    poly1305.prototype.blocks = function(m, mpos, bytes) {
      var hibit = this.fin ? 0 : 1 << 11;
      var t0, t1, t2, t3, t4, t5, t6, t7, c;
      var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
      var h0 = this.h[0], h1 = this.h[1], h2 = this.h[2], h3 = this.h[3], h4 = this.h[4], h5 = this.h[5], h6 = this.h[6], h7 = this.h[7], h8 = this.h[8], h9 = this.h[9];
      var r0 = this.r[0], r1 = this.r[1], r2 = this.r[2], r3 = this.r[3], r4 = this.r[4], r5 = this.r[5], r6 = this.r[6], r7 = this.r[7], r8 = this.r[8], r9 = this.r[9];
      while (bytes >= 16) {
        t0 = m[mpos + 0] & 255 | (m[mpos + 1] & 255) << 8;
        h0 += t0 & 8191;
        t1 = m[mpos + 2] & 255 | (m[mpos + 3] & 255) << 8;
        h1 += (t0 >>> 13 | t1 << 3) & 8191;
        t2 = m[mpos + 4] & 255 | (m[mpos + 5] & 255) << 8;
        h2 += (t1 >>> 10 | t2 << 6) & 8191;
        t3 = m[mpos + 6] & 255 | (m[mpos + 7] & 255) << 8;
        h3 += (t2 >>> 7 | t3 << 9) & 8191;
        t4 = m[mpos + 8] & 255 | (m[mpos + 9] & 255) << 8;
        h4 += (t3 >>> 4 | t4 << 12) & 8191;
        h5 += t4 >>> 1 & 8191;
        t5 = m[mpos + 10] & 255 | (m[mpos + 11] & 255) << 8;
        h6 += (t4 >>> 14 | t5 << 2) & 8191;
        t6 = m[mpos + 12] & 255 | (m[mpos + 13] & 255) << 8;
        h7 += (t5 >>> 11 | t6 << 5) & 8191;
        t7 = m[mpos + 14] & 255 | (m[mpos + 15] & 255) << 8;
        h8 += (t6 >>> 8 | t7 << 8) & 8191;
        h9 += t7 >>> 5 | hibit;
        c = 0;
        d0 = c;
        d0 += h0 * r0;
        d0 += h1 * (5 * r9);
        d0 += h2 * (5 * r8);
        d0 += h3 * (5 * r7);
        d0 += h4 * (5 * r6);
        c = d0 >>> 13;
        d0 &= 8191;
        d0 += h5 * (5 * r5);
        d0 += h6 * (5 * r4);
        d0 += h7 * (5 * r3);
        d0 += h8 * (5 * r2);
        d0 += h9 * (5 * r1);
        c += d0 >>> 13;
        d0 &= 8191;
        d1 = c;
        d1 += h0 * r1;
        d1 += h1 * r0;
        d1 += h2 * (5 * r9);
        d1 += h3 * (5 * r8);
        d1 += h4 * (5 * r7);
        c = d1 >>> 13;
        d1 &= 8191;
        d1 += h5 * (5 * r6);
        d1 += h6 * (5 * r5);
        d1 += h7 * (5 * r4);
        d1 += h8 * (5 * r3);
        d1 += h9 * (5 * r2);
        c += d1 >>> 13;
        d1 &= 8191;
        d2 = c;
        d2 += h0 * r2;
        d2 += h1 * r1;
        d2 += h2 * r0;
        d2 += h3 * (5 * r9);
        d2 += h4 * (5 * r8);
        c = d2 >>> 13;
        d2 &= 8191;
        d2 += h5 * (5 * r7);
        d2 += h6 * (5 * r6);
        d2 += h7 * (5 * r5);
        d2 += h8 * (5 * r4);
        d2 += h9 * (5 * r3);
        c += d2 >>> 13;
        d2 &= 8191;
        d3 = c;
        d3 += h0 * r3;
        d3 += h1 * r2;
        d3 += h2 * r1;
        d3 += h3 * r0;
        d3 += h4 * (5 * r9);
        c = d3 >>> 13;
        d3 &= 8191;
        d3 += h5 * (5 * r8);
        d3 += h6 * (5 * r7);
        d3 += h7 * (5 * r6);
        d3 += h8 * (5 * r5);
        d3 += h9 * (5 * r4);
        c += d3 >>> 13;
        d3 &= 8191;
        d4 = c;
        d4 += h0 * r4;
        d4 += h1 * r3;
        d4 += h2 * r2;
        d4 += h3 * r1;
        d4 += h4 * r0;
        c = d4 >>> 13;
        d4 &= 8191;
        d4 += h5 * (5 * r9);
        d4 += h6 * (5 * r8);
        d4 += h7 * (5 * r7);
        d4 += h8 * (5 * r6);
        d4 += h9 * (5 * r5);
        c += d4 >>> 13;
        d4 &= 8191;
        d5 = c;
        d5 += h0 * r5;
        d5 += h1 * r4;
        d5 += h2 * r3;
        d5 += h3 * r2;
        d5 += h4 * r1;
        c = d5 >>> 13;
        d5 &= 8191;
        d5 += h5 * r0;
        d5 += h6 * (5 * r9);
        d5 += h7 * (5 * r8);
        d5 += h8 * (5 * r7);
        d5 += h9 * (5 * r6);
        c += d5 >>> 13;
        d5 &= 8191;
        d6 = c;
        d6 += h0 * r6;
        d6 += h1 * r5;
        d6 += h2 * r4;
        d6 += h3 * r3;
        d6 += h4 * r2;
        c = d6 >>> 13;
        d6 &= 8191;
        d6 += h5 * r1;
        d6 += h6 * r0;
        d6 += h7 * (5 * r9);
        d6 += h8 * (5 * r8);
        d6 += h9 * (5 * r7);
        c += d6 >>> 13;
        d6 &= 8191;
        d7 = c;
        d7 += h0 * r7;
        d7 += h1 * r6;
        d7 += h2 * r5;
        d7 += h3 * r4;
        d7 += h4 * r3;
        c = d7 >>> 13;
        d7 &= 8191;
        d7 += h5 * r2;
        d7 += h6 * r1;
        d7 += h7 * r0;
        d7 += h8 * (5 * r9);
        d7 += h9 * (5 * r8);
        c += d7 >>> 13;
        d7 &= 8191;
        d8 = c;
        d8 += h0 * r8;
        d8 += h1 * r7;
        d8 += h2 * r6;
        d8 += h3 * r5;
        d8 += h4 * r4;
        c = d8 >>> 13;
        d8 &= 8191;
        d8 += h5 * r3;
        d8 += h6 * r2;
        d8 += h7 * r1;
        d8 += h8 * r0;
        d8 += h9 * (5 * r9);
        c += d8 >>> 13;
        d8 &= 8191;
        d9 = c;
        d9 += h0 * r9;
        d9 += h1 * r8;
        d9 += h2 * r7;
        d9 += h3 * r6;
        d9 += h4 * r5;
        c = d9 >>> 13;
        d9 &= 8191;
        d9 += h5 * r4;
        d9 += h6 * r3;
        d9 += h7 * r2;
        d9 += h8 * r1;
        d9 += h9 * r0;
        c += d9 >>> 13;
        d9 &= 8191;
        c = (c << 2) + c | 0;
        c = c + d0 | 0;
        d0 = c & 8191;
        c = c >>> 13;
        d1 += c;
        h0 = d0;
        h1 = d1;
        h2 = d2;
        h3 = d3;
        h4 = d4;
        h5 = d5;
        h6 = d6;
        h7 = d7;
        h8 = d8;
        h9 = d9;
        mpos += 16;
        bytes -= 16;
      }
      this.h[0] = h0;
      this.h[1] = h1;
      this.h[2] = h2;
      this.h[3] = h3;
      this.h[4] = h4;
      this.h[5] = h5;
      this.h[6] = h6;
      this.h[7] = h7;
      this.h[8] = h8;
      this.h[9] = h9;
    };
    poly1305.prototype.finish = function(mac, macpos) {
      var g = new Uint16Array(10);
      var c, mask, f, i;
      if (this.leftover) {
        i = this.leftover;
        this.buffer[i++] = 1;
        for (; i < 16; i++)
          this.buffer[i] = 0;
        this.fin = 1;
        this.blocks(this.buffer, 0, 16);
      }
      c = this.h[1] >>> 13;
      this.h[1] &= 8191;
      for (i = 2; i < 10; i++) {
        this.h[i] += c;
        c = this.h[i] >>> 13;
        this.h[i] &= 8191;
      }
      this.h[0] += c * 5;
      c = this.h[0] >>> 13;
      this.h[0] &= 8191;
      this.h[1] += c;
      c = this.h[1] >>> 13;
      this.h[1] &= 8191;
      this.h[2] += c;
      g[0] = this.h[0] + 5;
      c = g[0] >>> 13;
      g[0] &= 8191;
      for (i = 1; i < 10; i++) {
        g[i] = this.h[i] + c;
        c = g[i] >>> 13;
        g[i] &= 8191;
      }
      g[9] -= 1 << 13;
      mask = (c ^ 1) - 1;
      for (i = 0; i < 10; i++)
        g[i] &= mask;
      mask = ~mask;
      for (i = 0; i < 10; i++)
        this.h[i] = this.h[i] & mask | g[i];
      this.h[0] = (this.h[0] | this.h[1] << 13) & 65535;
      this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535;
      this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535;
      this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535;
      this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535;
      this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535;
      this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535;
      this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535;
      f = this.h[0] + this.pad[0];
      this.h[0] = f & 65535;
      for (i = 1; i < 8; i++) {
        f = (this.h[i] + this.pad[i] | 0) + (f >>> 16) | 0;
        this.h[i] = f & 65535;
      }
      mac[macpos + 0] = this.h[0] >>> 0 & 255;
      mac[macpos + 1] = this.h[0] >>> 8 & 255;
      mac[macpos + 2] = this.h[1] >>> 0 & 255;
      mac[macpos + 3] = this.h[1] >>> 8 & 255;
      mac[macpos + 4] = this.h[2] >>> 0 & 255;
      mac[macpos + 5] = this.h[2] >>> 8 & 255;
      mac[macpos + 6] = this.h[3] >>> 0 & 255;
      mac[macpos + 7] = this.h[3] >>> 8 & 255;
      mac[macpos + 8] = this.h[4] >>> 0 & 255;
      mac[macpos + 9] = this.h[4] >>> 8 & 255;
      mac[macpos + 10] = this.h[5] >>> 0 & 255;
      mac[macpos + 11] = this.h[5] >>> 8 & 255;
      mac[macpos + 12] = this.h[6] >>> 0 & 255;
      mac[macpos + 13] = this.h[6] >>> 8 & 255;
      mac[macpos + 14] = this.h[7] >>> 0 & 255;
      mac[macpos + 15] = this.h[7] >>> 8 & 255;
    };
    poly1305.prototype.update = function(m, mpos, bytes) {
      var i, want;
      if (this.leftover) {
        want = 16 - this.leftover;
        if (want > bytes)
          want = bytes;
        for (i = 0; i < want; i++)
          this.buffer[this.leftover + i] = m[mpos + i];
        bytes -= want;
        mpos += want;
        this.leftover += want;
        if (this.leftover < 16)
          return;
        this.blocks(this.buffer, 0, 16);
        this.leftover = 0;
      }
      if (bytes >= 16) {
        want = bytes - bytes % 16;
        this.blocks(m, mpos, want);
        mpos += want;
        bytes -= want;
      }
      if (bytes) {
        for (i = 0; i < bytes; i++)
          this.buffer[this.leftover + i] = m[mpos + i];
        this.leftover += bytes;
      }
    };
    module.exports = poly1305;
  }
});

// node_modules/sodium-javascript/crypto_onetimeauth.js
var require_crypto_onetimeauth = __commonJS({
  "node_modules/sodium-javascript/crypto_onetimeauth.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var Poly1305 = require_poly1305();
    var { crypto_verify_16 } = require_crypto_verify();
    var crypto_onetimeauth_BYTES = 16;
    var crypto_onetimeauth_KEYBYTES = 32;
    var crypto_onetimeauth_PRIMITIVE = "poly1305";
    module.exports = {
      crypto_onetimeauth,
      crypto_onetimeauth_verify,
      crypto_onetimeauth_BYTES,
      crypto_onetimeauth_KEYBYTES,
      crypto_onetimeauth_PRIMITIVE
    };
    function crypto_onetimeauth(mac, msg, key) {
      assert(mac.byteLength === crypto_onetimeauth_BYTES, "mac must be 'crypto_onetimeauth_BYTES' bytes");
      assert(msg.byteLength != null, "msg must be buffer");
      assert(key.byteLength === crypto_onetimeauth_KEYBYTES, "key must be 'crypto_onetimeauth_KEYBYTES' bytes");
      var s = new Poly1305(key);
      s.update(msg, 0, msg.byteLength);
      s.finish(mac, 0);
    }
    function crypto_onetimeauth_verify(mac, msg, key) {
      assert(mac.byteLength === crypto_onetimeauth_BYTES, "mac must be 'crypto_onetimeauth_BYTES' bytes");
      assert(msg.byteLength != null, "msg must be buffer");
      assert(key.byteLength === crypto_onetimeauth_KEYBYTES, "key must be 'crypto_onetimeauth_KEYBYTES' bytes");
      var tmp = new Uint8Array(16);
      crypto_onetimeauth(tmp, msg, key);
      return crypto_verify_16(mac, 0, tmp, 0);
    }
  }
});

// node_modules/sodium-javascript/crypto_secretbox.js
var require_crypto_secretbox = __commonJS({
  "node_modules/sodium-javascript/crypto_secretbox.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var { crypto_stream, crypto_stream_xor } = require_crypto_stream();
    var { crypto_onetimeauth, crypto_onetimeauth_verify, crypto_onetimeauth_BYTES, crypto_onetimeauth_KEYBYTES } = require_crypto_onetimeauth();
    var crypto_secretbox_KEYBYTES = 32;
    var crypto_secretbox_NONCEBYTES = 24;
    var crypto_secretbox_ZEROBYTES = 32;
    var crypto_secretbox_BOXZEROBYTES = 16;
    var crypto_secretbox_MACBYTES = 16;
    module.exports = {
      crypto_secretbox,
      crypto_secretbox_open,
      crypto_secretbox_detached,
      crypto_secretbox_open_detached,
      crypto_secretbox_easy,
      crypto_secretbox_open_easy,
      crypto_secretbox_KEYBYTES,
      crypto_secretbox_NONCEBYTES,
      crypto_secretbox_ZEROBYTES,
      crypto_secretbox_BOXZEROBYTES,
      crypto_secretbox_MACBYTES
    };
    function crypto_secretbox(c, m, n, k) {
      assert(c.byteLength === m.byteLength, "c must be 'm.byteLength' bytes");
      const mlen = m.byteLength;
      assert(mlen >= crypto_secretbox_ZEROBYTES, "mlen must be at least 'crypto_secretbox_ZEROBYTES'");
      assert(n.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
      assert(k.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
      crypto_stream_xor(c, m, n, k);
      crypto_onetimeauth(c.subarray(crypto_secretbox_BOXZEROBYTES, crypto_secretbox_BOXZEROBYTES + crypto_onetimeauth_BYTES), c.subarray(crypto_secretbox_BOXZEROBYTES + crypto_onetimeauth_BYTES, c.byteLength), c.subarray(0, crypto_onetimeauth_KEYBYTES));
      c.fill(0, 0, crypto_secretbox_BOXZEROBYTES);
    }
    function crypto_secretbox_open(m, c, n, k) {
      assert(c.byteLength === m.byteLength, "c must be 'm.byteLength' bytes");
      const mlen = m.byteLength;
      assert(mlen >= crypto_secretbox_ZEROBYTES, "mlen must be at least 'crypto_secretbox_ZEROBYTES'");
      assert(n.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
      assert(k.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
      const x = new Uint8Array(crypto_onetimeauth_KEYBYTES);
      crypto_stream(x, n, k);
      const validMac = crypto_onetimeauth_verify(c.subarray(crypto_secretbox_BOXZEROBYTES, crypto_secretbox_BOXZEROBYTES + crypto_onetimeauth_BYTES), c.subarray(crypto_secretbox_BOXZEROBYTES + crypto_onetimeauth_BYTES, c.byteLength), x);
      if (validMac === false)
        return false;
      crypto_stream_xor(m, c, n, k);
      m.fill(0, 0, 32);
      return true;
    }
    function crypto_secretbox_detached(o, mac, msg, n, k) {
      assert(o.byteLength === msg.byteLength, "o must be 'msg.byteLength' bytes");
      assert(mac.byteLength === crypto_secretbox_MACBYTES, "mac must be 'crypto_secretbox_MACBYTES' bytes");
      assert(n.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
      assert(k.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
      const tmp = new Uint8Array(msg.byteLength + mac.byteLength);
      crypto_secretbox_easy(tmp, msg, n, k);
      mac.set(tmp.subarray(0, mac.byteLength));
      o.set(tmp.subarray(mac.byteLength));
      return true;
    }
    function crypto_secretbox_open_detached(msg, o, mac, n, k) {
      assert(o.byteLength === msg.byteLength, "o must be 'msg.byteLength' bytes");
      assert(mac.byteLength === crypto_secretbox_MACBYTES, "mac must be 'crypto_secretbox_MACBYTES' bytes");
      assert(n.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
      assert(k.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
      const tmp = new Uint8Array(o.byteLength + mac.byteLength);
      tmp.set(mac);
      tmp.set(o, mac.byteLength);
      return crypto_secretbox_open_easy(msg, tmp, n, k);
    }
    function crypto_secretbox_easy(o, msg, n, k) {
      assert(o.byteLength === msg.byteLength + crypto_secretbox_MACBYTES, "o must be 'msg.byteLength + crypto_secretbox_MACBYTES' bytes");
      assert(n.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
      assert(k.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
      const m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.byteLength);
      const c = new Uint8Array(m.byteLength);
      m.set(msg, crypto_secretbox_ZEROBYTES);
      crypto_secretbox(c, m, n, k);
      o.set(c.subarray(crypto_secretbox_BOXZEROBYTES));
    }
    function crypto_secretbox_open_easy(msg, box, n, k) {
      assert(box.byteLength === msg.byteLength + crypto_secretbox_MACBYTES, "box must be 'msg.byteLength + crypto_secretbox_MACBYTES' bytes");
      assert(n.byteLength === crypto_secretbox_NONCEBYTES, "n must be 'crypto_secretbox_NONCEBYTES' bytes");
      assert(k.byteLength === crypto_secretbox_KEYBYTES, "k must be 'crypto_secretbox_KEYBYTES' bytes");
      const c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.byteLength);
      const m = new Uint8Array(c.byteLength);
      c.set(box, crypto_secretbox_BOXZEROBYTES);
      if (crypto_secretbox_open(m, c, n, k) === false)
        return false;
      msg.set(m.subarray(crypto_secretbox_ZEROBYTES));
      return true;
    }
  }
});

// node_modules/sodium-javascript/crypto_box.js
var require_crypto_box = __commonJS({
  "node_modules/sodium-javascript/crypto_box.js"(exports, module) {
    init_node_globals();
    var { crypto_hash_sha512 } = require_crypto_hash();
    var { crypto_scalarmult, crypto_scalarmult_base } = require_crypto_scalarmult();
    var { randombytes } = require_randombytes();
    var { crypto_generichash_batch } = require_crypto_generichash();
    var { crypto_stream_xsalsa20_MESSAGEBYTES_MAX } = require_crypto_stream();
    var {
      crypto_secretbox_open_easy,
      crypto_secretbox_easy,
      crypto_secretbox_detached,
      crypto_secretbox_open_detached
    } = require_crypto_secretbox();
    var xsalsa20 = require_xsalsa202();
    var assert = require_nanoassert();
    var crypto_box_PUBLICKEYBYTES = 32;
    var crypto_box_SECRETKEYBYTES = 32;
    var crypto_box_NONCEBYTES = 24;
    var crypto_box_ZEROBYTES = 32;
    var crypto_box_BOXZEROBYTES = 16;
    var crypto_box_SEALBYTES = 48;
    var crypto_box_SEEDBYTES = 32;
    var crypto_box_BEFORENMBYTES = 32;
    var crypto_box_MACBYTES = 16;
    var crypto_box_curve25519xsalsa20poly1305_MACBYTES = 16;
    var crypto_box_MESSAGEBYTES_MAX = crypto_stream_xsalsa20_MESSAGEBYTES_MAX - crypto_box_curve25519xsalsa20poly1305_MACBYTES;
    module.exports = {
      crypto_box_easy,
      crypto_box_open_easy,
      crypto_box_keypair,
      crypto_box_seed_keypair,
      crypto_box_seal,
      crypto_box_seal_open,
      crypto_box_PUBLICKEYBYTES,
      crypto_box_SECRETKEYBYTES,
      crypto_box_NONCEBYTES,
      crypto_box_ZEROBYTES,
      crypto_box_BOXZEROBYTES,
      crypto_box_SEALBYTES,
      crypto_box_SEEDBYTES,
      crypto_box_BEFORENMBYTES,
      crypto_box_MACBYTES
    };
    function crypto_box_keypair(pk, sk) {
      check(pk, crypto_box_PUBLICKEYBYTES);
      check(sk, crypto_box_SECRETKEYBYTES);
      randombytes(sk, 32);
      return crypto_scalarmult_base(pk, sk);
    }
    function crypto_box_seed_keypair(pk, sk, seed) {
      assert(pk.byteLength === crypto_box_PUBLICKEYBYTES, "pk should be 'crypto_box_PUBLICKEYBYTES' bytes");
      assert(sk.byteLength === crypto_box_SECRETKEYBYTES, "sk should be 'crypto_box_SECRETKEYBYTES' bytes");
      assert(sk.byteLength === crypto_box_SEEDBYTES, "sk should be 'crypto_box_SEEDBYTES' bytes");
      const hash = new Uint8Array(64);
      crypto_hash_sha512(hash, seed, 32);
      sk.set(hash.subarray(0, 32));
      hash.fill(0);
      return crypto_scalarmult_base(pk, sk);
    }
    function crypto_box_seal(c, m, pk) {
      check(c, crypto_box_SEALBYTES + m.length);
      check(pk, crypto_box_PUBLICKEYBYTES);
      var epk = c.subarray(0, crypto_box_PUBLICKEYBYTES);
      var esk = new Uint8Array(crypto_box_SECRETKEYBYTES);
      crypto_box_keypair(epk, esk);
      var n = new Uint8Array(crypto_box_NONCEBYTES);
      crypto_generichash_batch(n, [epk, pk]);
      var s = new Uint8Array(crypto_box_PUBLICKEYBYTES);
      crypto_scalarmult(s, esk, pk);
      var k = new Uint8Array(crypto_box_BEFORENMBYTES);
      var zero = new Uint8Array(16);
      xsalsa20.core_hsalsa20(k, zero, s, xsalsa20.SIGMA);
      crypto_secretbox_easy(c.subarray(epk.length), m, n, k);
      cleanup(esk);
    }
    function crypto_box_seal_open(m, c, pk, sk) {
      check(c, crypto_box_SEALBYTES);
      check(m, c.length - crypto_box_SEALBYTES);
      check(pk, crypto_box_PUBLICKEYBYTES);
      check(sk, crypto_box_SECRETKEYBYTES);
      var epk = c.subarray(0, crypto_box_PUBLICKEYBYTES);
      var n = new Uint8Array(crypto_box_NONCEBYTES);
      crypto_generichash_batch(n, [epk, pk]);
      var s = new Uint8Array(crypto_box_PUBLICKEYBYTES);
      crypto_scalarmult(s, sk, epk);
      var k = new Uint8Array(crypto_box_BEFORENMBYTES);
      var zero = new Uint8Array(16);
      xsalsa20.core_hsalsa20(k, zero, s, xsalsa20.SIGMA);
      return crypto_secretbox_open_easy(m, c.subarray(epk.length), n, k);
    }
    function crypto_box_beforenm(k, pk, sk) {
      const zero = new Uint8Array(16);
      const s = new Uint8Array(32);
      assert(crypto_scalarmult(s, sk, pk) === 0);
      xsalsa20.core_hsalsa20(k, zero, s, xsalsa20.SIGMA);
      return true;
    }
    function crypto_box_detached_afternm(c, mac, m, n, k) {
      return crypto_secretbox_detached(c, mac, m, n, k);
    }
    function crypto_box_detached(c, mac, m, n, pk, sk) {
      check(mac, crypto_box_MACBYTES);
      check(n, crypto_box_NONCEBYTES);
      check(pk, crypto_box_PUBLICKEYBYTES);
      check(sk, crypto_box_SECRETKEYBYTES);
      const k = new Uint8Array(crypto_box_BEFORENMBYTES);
      assert(crypto_box_beforenm(k, pk, sk));
      const ret = crypto_box_detached_afternm(c, mac, m, n, k);
      cleanup(k);
      return ret;
    }
    function crypto_box_easy(c, m, n, pk, sk) {
      assert(c.length >= m.length + crypto_box_MACBYTES, "c should be at least 'm.length + crypto_box_MACBYTES' bytes");
      assert(m.length <= crypto_box_MESSAGEBYTES_MAX, "m should be at most 'crypto_box_MESSAGEBYTES_MAX' bytes");
      return crypto_box_detached(c.subarray(crypto_box_MACBYTES, m.length + crypto_box_MACBYTES), c.subarray(0, crypto_box_MACBYTES), m, n, pk, sk);
    }
    function crypto_box_open_detached_afternm(m, c, mac, n, k) {
      return crypto_secretbox_open_detached(m, c, mac, n, k);
    }
    function crypto_box_open_detached(m, c, mac, n, pk, sk) {
      const k = new Uint8Array(crypto_box_BEFORENMBYTES);
      assert(crypto_box_beforenm(k, pk, sk));
      const ret = crypto_box_open_detached_afternm(m, c, mac, n, k);
      cleanup(k);
      return ret;
    }
    function crypto_box_open_easy(m, c, n, pk, sk) {
      assert(c.length >= m.length + crypto_box_MACBYTES, "c should be at least 'm.length + crypto_box_MACBYTES' bytes");
      return crypto_box_open_detached(m, c.subarray(crypto_box_MACBYTES, m.length + crypto_box_MACBYTES), c.subarray(0, crypto_box_MACBYTES), n, pk, sk);
    }
    function check(buf, len) {
      if (!buf || len && buf.length < len)
        throw new Error("Argument must be a buffer" + (len ? " of length " + len : ""));
    }
    function cleanup(arr) {
      for (let i = 0; i < arr.length; i++)
        arr[i] = 0;
    }
  }
});

// node_modules/sha256-universal/sha256.js
var require_sha256 = __commonJS({
  "node_modules/sha256-universal/sha256.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var b4a = require_browser2();
    module.exports = Sha256;
    var SHA256_BYTES = module.exports.SHA256_BYTES = 32;
    var BLOCKSIZE = 64;
    var K = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ];
    function expand(a, b, c, d) {
      var b_ = ((a >>> 17 | a << 15) ^ (a >>> 19 | a << 13) ^ a >>> 10) + b;
      var d_ = ((c >>> 7 | c << 25) ^ (c >>> 18 | c << 14) ^ c >>> 3) + d;
      return b_ + d_ << 0;
    }
    function compress(state, words) {
      var ch, maj, s0, s1, T1, T2;
      var [a, b, c, d, e, f, g, h] = state;
      const w = new Uint32Array(64);
      for (let i = 0; i < 16; i++)
        w[i] = bswap(words[i]);
      for (let i = 16; i < 64; i++)
        w[i] = expand(w[i - 2], w[i - 7], w[i - 15], w[i - 16]);
      for (let i = 0; i < 64; i += 4)
        round(i);
      state[0] = state[0] + a;
      state[1] = state[1] + b;
      state[2] = state[2] + c;
      state[3] = state[3] + d;
      state[4] = state[4] + e;
      state[5] = state[5] + f;
      state[6] = state[6] + g;
      state[7] = state[7] + h;
      function round(n) {
        ch = e & f ^ ~e & g;
        maj = a & b ^ a & c ^ b & c;
        s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
        s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
        T1 = h + ch + s1 + w[n] + K[n];
        T2 = s0 + maj;
        h = d + T1;
        d = T1 + T2;
        ch = h & e ^ ~h & f;
        maj = d & a ^ d & b ^ a & b;
        s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
        s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
        T1 = g + ch + s1 + w[n + 1] + K[n + 1];
        T2 = s0 + maj;
        g = c + T1;
        c = T1 + T2;
        ch = g & h ^ ~g & e;
        maj = c & d ^ c & a ^ d & a;
        s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
        s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
        T1 = f + ch + s1 + w[n + 2] + K[n + 2];
        T2 = s0 + maj;
        f = b + T1;
        b = T1 + T2;
        ch = f & g ^ ~f & h;
        maj = b & c ^ b & d ^ c & d;
        s0 = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
        s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
        T1 = e + ch + s1 + w[n + 3] + K[n + 3];
        T2 = s0 + maj;
        e = a + T1;
        a = T1 + T2;
      }
    }
    function Sha256() {
      if (!(this instanceof Sha256))
        return new Sha256();
      this.buffer = new ArrayBuffer(64);
      this.bytesRead = 0;
      this.pos = 0;
      this.digestLength = SHA256_BYTES;
      this.finalised = false;
      this.load = new Uint8Array(this.buffer);
      this.words = new Uint32Array(this.buffer);
      this.state = new Uint32Array([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
      return this;
    }
    Sha256.prototype.update = function(input, enc) {
      assert(this.finalised === false, "Hash instance finalised");
      var [inputBuf, len] = formatInput(input, enc);
      var i = 0;
      this.bytesRead += len;
      while (len > 0) {
        this.load.set(inputBuf.subarray(i, i + BLOCKSIZE - this.pos), this.pos);
        i += BLOCKSIZE - this.pos;
        len -= BLOCKSIZE - this.pos;
        if (len < 0)
          break;
        this.pos = 0;
        compress(this.state, this.words);
      }
      this.pos = this.bytesRead & 63;
      this.load.fill(0, this.pos);
      return this;
    };
    Sha256.prototype.digest = function(enc, offset = 0) {
      assert(this.finalised === false, "Hash instance finalised");
      this.finalised = true;
      this.load.fill(0, this.pos);
      this.load[this.pos] = 128;
      if (this.pos > 55) {
        compress(this.state, this.words);
        this.words.fill(0);
        this.pos = 0;
      }
      const view = new DataView(this.buffer);
      view.setUint32(56, this.bytesRead / 2 ** 29);
      view.setUint32(60, this.bytesRead << 3);
      compress(this.state, this.words);
      const resultBuf = new Uint8Array(this.state.map(bswap).buffer);
      if (!enc) {
        return new Uint8Array(resultBuf);
      }
      if (typeof enc === "string") {
        return b4a.toString(resultBuf, enc);
      }
      assert(enc instanceof Uint8Array, "input must be Uint8Array or Buffer");
      assert(enc.byteLength >= this.digestLength + offset, "input not large enough for digest");
      for (let i = 0; i < this.digestLength; i++) {
        enc[i + offset] = resultBuf[i];
      }
      return enc;
    };
    function HMAC(key) {
      if (!(this instanceof HMAC))
        return new HMAC(key);
      this.pad = b4a.alloc(64);
      this.inner = Sha256();
      this.outer = Sha256();
      const keyhash = b4a.alloc(32);
      if (key.byteLength > 64) {
        Sha256().update(key).digest(keyhash);
        key = keyhash;
      }
      this.pad.fill(54);
      for (let i = 0; i < key.byteLength; i++) {
        this.pad[i] ^= key[i];
      }
      this.inner.update(this.pad);
      this.pad.fill(92);
      for (let i = 0; i < key.byteLength; i++) {
        this.pad[i] ^= key[i];
      }
      this.outer.update(this.pad);
      this.pad.fill(0);
      keyhash.fill(0);
    }
    HMAC.prototype.update = function(input, enc) {
      this.inner.update(input, enc);
      return this;
    };
    HMAC.prototype.digest = function(enc, offset = 0) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc, offset);
    };
    Sha256.HMAC = HMAC;
    function formatInput(input, enc) {
      var result = b4a.from(input, enc);
      return [result, result.byteLength];
    }
    function bswap(a) {
      var r = (a & 16711935) >>> 8 | (a & 16711935) << 24;
      var l = (a & 4278255360) << 8 | (a & 4278255360) >>> 24;
      return r | l;
    }
  }
});

// node_modules/sha256-wasm/sha256.js
var require_sha2562 = __commonJS({
  "node_modules/sha256-wasm/sha256.js"(exports, module) {
    init_node_globals();
    var __commonJS2 = (cb, mod) => function __require2() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __toBinary = /* @__PURE__ */ (() => {
      var table = new Uint8Array(128);
      for (var i = 0; i < 64; i++)
        table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
      return (base64) => {
        var n = base64.length, bytes2 = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
        for (var i2 = 0, j = 0; i2 < n; ) {
          var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
          var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
          bytes2[j++] = c0 << 2 | c1 >> 4;
          bytes2[j++] = c1 << 4 | c2 >> 2;
          bytes2[j++] = c2 << 6 | c3;
        }
        return bytes2;
      };
    })();
    var require_sha2563 = __commonJS2({
      "wasm-binary:./sha256.wat"(exports2, module2) {
        module2.exports = __toBinary("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");
      }
    });
    var bytes = require_sha2563();
    var compiled = new WebAssembly.Module(bytes);
    module.exports = (imports) => {
      const instance = new WebAssembly.Instance(compiled, imports);
      return instance.exports;
    };
  }
});

// node_modules/sha256-wasm/index.js
var require_sha256_wasm = __commonJS({
  "node_modules/sha256-wasm/index.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var b4a = require_browser2();
    var wasm = typeof WebAssembly !== "undefined" && require_sha2562()({
      imports: {
        debug: {
          log(...args) {
            console.log(...args.map((int) => (int >>> 0).toString(16).padStart(8, "0")));
          },
          log_tee(arg) {
            console.log((arg >>> 0).toString(16).padStart(8, "0"));
            return arg;
          }
        }
      }
    });
    var head = 0;
    var freeList = [];
    module.exports = Sha256;
    var SHA256_BYTES = module.exports.SHA256_BYTES = 32;
    var INPUT_OFFSET = 40;
    var STATEBYTES = 108;
    var BLOCKSIZE = 64;
    function Sha256() {
      if (!(this instanceof Sha256))
        return new Sha256();
      if (!wasm)
        throw new Error("WASM not loaded. Wait for Sha256.ready(cb)");
      if (!freeList.length) {
        freeList.push(head);
        head += STATEBYTES;
      }
      this.finalized = false;
      this.digestLength = SHA256_BYTES;
      this.pointer = freeList.pop();
      this.pos = 0;
      this._memory = new Uint8Array(wasm.memory.buffer);
      this._memory.fill(0, this.pointer, this.pointer + STATEBYTES);
      if (this.pointer + this.digestLength > this._memory.length)
        this._realloc(this.pointer + STATEBYTES);
    }
    Sha256.prototype._realloc = function(size) {
      wasm.memory.grow(Math.max(0, Math.ceil(Math.abs(size - this._memory.length) / 65536)));
      this._memory = new Uint8Array(wasm.memory.buffer);
    };
    Sha256.prototype.update = function(input, enc) {
      assert(this.finalized === false, "Hash instance finalized");
      if (head % 4 !== 0)
        head += 4 - head % 4;
      assert(head % 4 === 0, "input shoud be aligned for int32");
      const [inputBuf, length] = formatInput(input, enc);
      assert(inputBuf instanceof Uint8Array, "input must be Uint8Array or Buffer");
      if (head + length > this._memory.length)
        this._realloc(head + input.length);
      this._memory.fill(0, head, head + roundUp(length, BLOCKSIZE) - BLOCKSIZE);
      this._memory.set(inputBuf.subarray(0, BLOCKSIZE - this.pos), this.pointer + INPUT_OFFSET + this.pos);
      this._memory.set(inputBuf.subarray(BLOCKSIZE - this.pos), head);
      this.pos = this.pos + length & 63;
      wasm.sha256(this.pointer, head, length, 0);
      return this;
    };
    Sha256.prototype.digest = function(enc, offset = 0) {
      assert(this.finalized === false, "Hash instance finalized");
      this.finalized = true;
      freeList.push(this.pointer);
      const paddingStart = this.pointer + INPUT_OFFSET + this.pos;
      this._memory.fill(0, paddingStart, this.pointer + INPUT_OFFSET + BLOCKSIZE);
      wasm.sha256(this.pointer, head, 0, 1);
      const resultBuf = this._memory.subarray(this.pointer, this.pointer + this.digestLength);
      if (!enc) {
        return resultBuf;
      }
      if (typeof enc === "string") {
        return b4a.toString(resultBuf, enc);
      }
      assert(enc instanceof Uint8Array, "output must be Uint8Array or Buffer");
      assert(enc.byteLength >= this.digestLength + offset, "output must have at least 'SHA256_BYTES' bytes remaining");
      for (let i = 0; i < this.digestLength; i++) {
        enc[i + offset] = resultBuf[i];
      }
      return enc;
    };
    Sha256.WASM = wasm;
    Sha256.WASM_SUPPORTED = typeof WebAssembly !== "undefined";
    Sha256.ready = function(cb) {
      if (!cb)
        cb = noop;
      if (!wasm)
        return cb(new Error("WebAssembly not supported"));
      cb();
      return Promise.resolve();
    };
    Sha256.prototype.ready = Sha256.ready;
    function HMAC(key) {
      if (!(this instanceof HMAC))
        return new HMAC(key);
      this.pad = b4a.alloc(64);
      this.inner = Sha256();
      this.outer = Sha256();
      const keyhash = b4a.alloc(32);
      if (key.byteLength > 64) {
        Sha256().update(key).digest(keyhash);
        key = keyhash;
      }
      this.pad.fill(54);
      for (let i = 0; i < key.byteLength; i++) {
        this.pad[i] ^= key[i];
      }
      this.inner.update(this.pad);
      this.pad.fill(92);
      for (let i = 0; i < key.byteLength; i++) {
        this.pad[i] ^= key[i];
      }
      this.outer.update(this.pad);
      this.pad.fill(0);
      keyhash.fill(0);
    }
    HMAC.prototype.update = function(input, enc) {
      this.inner.update(input, enc);
      return this;
    };
    HMAC.prototype.digest = function(enc, offset = 0) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc, offset);
    };
    Sha256.HMAC = HMAC;
    function noop() {
    }
    function formatInput(input, enc) {
      var result = b4a.from(input, enc);
      return [result, result.byteLength];
    }
    function roundUp(n, base) {
      return n + base - 1 & -base;
    }
  }
});

// node_modules/sha256-universal/index.js
var require_sha256_universal = __commonJS({
  "node_modules/sha256-universal/index.js"(exports, module) {
    init_node_globals();
    var js = require_sha256();
    var wasm = require_sha256_wasm();
    var Proto = js;
    module.exports = function() {
      return new Proto();
    };
    module.exports.ready = function(cb) {
      wasm.ready(function() {
        cb();
      });
    };
    module.exports.WASM_SUPPORTED = wasm.WASM_SUPPORTED;
    module.exports.WASM_LOADED = false;
    var SHA256_BYTES = module.exports.SHA256_BYTES = 32;
    wasm.ready(function(err) {
      if (!err) {
        module.exports.WASM_LOADED = true;
        module.exports = Proto = wasm;
      }
    });
  }
});

// node_modules/sodium-javascript/crypto_hash_sha256.js
var require_crypto_hash_sha256 = __commonJS({
  "node_modules/sodium-javascript/crypto_hash_sha256.js"(exports, module) {
    init_node_globals();
    var sha256 = require_sha256_universal();
    var assert = require_nanoassert();
    if (new Uint16Array([1])[0] !== 1)
      throw new Error("Big endian architecture is not supported.");
    var crypto_hash_sha256_BYTES = 32;
    function crypto_hash_sha256(out, m, n) {
      assert(out.byteLength === crypto_hash_sha256_BYTES, "out must be 'crypto_hash_sha256_BYTES' bytes long");
      sha256().update(m.subarray(0, n)).digest(out);
      return 0;
    }
    module.exports = {
      crypto_hash_sha256,
      crypto_hash_sha256_BYTES
    };
  }
});

// node_modules/sodium-javascript/crypto_kdf.js
var require_crypto_kdf = __commonJS({
  "node_modules/sodium-javascript/crypto_kdf.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var randombytes_buf = require_randombytes().randombytes_buf;
    var blake2b = require_blake2b2();
    module.exports.crypto_kdf_PRIMITIVE = "blake2b";
    module.exports.crypto_kdf_BYTES_MIN = 16;
    module.exports.crypto_kdf_BYTES_MAX = 64;
    module.exports.crypto_kdf_CONTEXTBYTES = 8;
    module.exports.crypto_kdf_KEYBYTES = 32;
    function STORE64_LE(dest, int) {
      var mul = 1;
      var i = 0;
      dest[0] = int & 255;
      while (++i < 8 && (mul *= 256)) {
        dest[i] = int / mul & 255;
      }
    }
    module.exports.crypto_kdf_derive_from_key = function crypto_kdf_derive_from_key(subkey, subkey_id, ctx, key) {
      assert(subkey.length >= module.exports.crypto_kdf_BYTES_MIN, "subkey must be at least crypto_kdf_BYTES_MIN");
      assert(subkey_id >= 0 && subkey_id <= 9007199254740991, "subkey_id must be safe integer");
      assert(ctx.length >= module.exports.crypto_kdf_CONTEXTBYTES, "context must be at least crypto_kdf_CONTEXTBYTES");
      var ctx_padded = new Uint8Array(blake2b.PERSONALBYTES);
      var salt = new Uint8Array(blake2b.SALTBYTES);
      ctx_padded.set(ctx, 0, module.exports.crypto_kdf_CONTEXTBYTES);
      STORE64_LE(salt, subkey_id);
      var outlen = Math.min(subkey.length, module.exports.crypto_kdf_BYTES_MAX);
      blake2b(outlen, key.subarray(0, module.exports.crypto_kdf_KEYBYTES), salt, ctx_padded, true).final(subkey);
    };
    module.exports.crypto_kdf_keygen = function crypto_kdf_keygen(out) {
      assert(out.length >= module.exports.crypto_kdf_KEYBYTES, "out.length must be crypto_kdf_KEYBYTES");
      randombytes_buf(out.subarray(0, module.exports.crypto_kdf_KEYBYTES));
    };
  }
});

// node_modules/sodium-javascript/crypto_kx.js
var require_crypto_kx = __commonJS({
  "node_modules/sodium-javascript/crypto_kx.js"(exports, module) {
    init_node_globals();
    var { crypto_scalarmult_base } = require_crypto_scalarmult();
    var { crypto_generichash } = require_crypto_generichash();
    var { randombytes_buf } = require_randombytes();
    var assert = require_nanoassert();
    var crypto_kx_SEEDBYTES = 32;
    var crypto_kx_PUBLICKEYBYTES = 32;
    var crypto_kx_SECRETKEYBYTES = 32;
    function crypto_kx_keypair(pk, sk) {
      assert(pk.byteLength === crypto_kx_PUBLICKEYBYTES, "pk must be 'crypto_kx_PUBLICKEYBYTES' bytes");
      assert(sk.byteLength === crypto_kx_SECRETKEYBYTES, "sk must be 'crypto_kx_SECRETKEYBYTES' bytes");
      randombytes_buf(sk, crypto_kx_SECRETKEYBYTES);
      return crypto_scalarmult_base(pk, sk);
    }
    function crypto_kx_seed_keypair(pk, sk, seed) {
      assert(pk.byteLength === crypto_kx_PUBLICKEYBYTES, "pk must be 'crypto_kx_PUBLICKEYBYTES' bytes");
      assert(sk.byteLength === crypto_kx_SECRETKEYBYTES, "sk must be 'crypto_kx_SECRETKEYBYTES' bytes");
      assert(seed.byteLength === crypto_kx_SEEDBYTES, "seed must be 'crypto_kx_SEEDBYTES' bytes");
      crypto_generichash(sk, seed);
      return crypto_scalarmult_base(pk, sk);
    }
    module.exports = {
      crypto_kx_keypair,
      crypto_kx_seed_keypair,
      crypto_kx_SEEDBYTES,
      crypto_kx_SECRETKEYBYTES,
      crypto_kx_PUBLICKEYBYTES
    };
  }
});

// node_modules/chacha20-universal/index.js
var require_chacha20_universal = __commonJS({
  "node_modules/chacha20-universal/index.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    module.exports = Chacha20;
    var constant = [1634760805, 857760878, 2036477234, 1797285236];
    function Chacha20(nonce, key, counter) {
      assert(key.byteLength === 32);
      assert(nonce.byteLength === 8 || nonce.byteLength === 12);
      const n = new Uint32Array(nonce.buffer, nonce.byteOffset, nonce.byteLength / 4);
      const k = new Uint32Array(key.buffer, key.byteOffset, key.byteLength / 4);
      if (!counter)
        counter = 0;
      assert(counter < Number.MAX_SAFE_INTEGER);
      this.finalized = false;
      this.pos = 0;
      this.state = new Uint32Array(16);
      for (let i = 0; i < 4; i++)
        this.state[i] = constant[i];
      for (let i = 0; i < 8; i++)
        this.state[4 + i] = k[i];
      this.state[12] = counter & 4294967295;
      if (n.byteLength === 8) {
        this.state[13] = (counter && 18446744069414584e3) >> 32;
        this.state[14] = n[0];
        this.state[15] = n[1];
      } else {
        this.state[13] = n[0];
        this.state[14] = n[1];
        this.state[15] = n[2];
      }
      return this;
    }
    Chacha20.prototype.update = function(output, input) {
      assert(!this.finalized, "cipher finalized.");
      assert(output.byteLength >= input.byteLength, "output cannot be shorter than input.");
      let len = input.length;
      let offset = this.pos % 64;
      this.pos += len;
      let j = 0;
      let keyStream = chacha20Block(this.state);
      while (offset > 0 && len > 0) {
        output[j] = input[j++] ^ keyStream[offset];
        offset = offset + 1 & 63;
        if (!offset)
          this.state[12]++;
        len--;
      }
      while (len > 0) {
        keyStream = chacha20Block(this.state);
        if (len < 64) {
          for (let i = 0; i < len; i++) {
            output[j] = input[j++] ^ keyStream[offset++];
            offset &= 63;
          }
          return;
        }
        for (; offset < 64; ) {
          output[j] = input[j++] ^ keyStream[offset++];
        }
        this.state[12]++;
        offset = 0;
        len -= 64;
      }
    };
    Chacha20.prototype.final = function() {
      this.state.fill(0);
      this.pos = 0;
      this.finalized = true;
    };
    function chacha20Block(state) {
      const ws = new Uint32Array(16);
      for (let i = 16; i--; )
        ws[i] = state[i];
      for (let i = 0; i < 20; i += 2) {
        QR(ws, 0, 4, 8, 12);
        QR(ws, 1, 5, 9, 13);
        QR(ws, 2, 6, 10, 14);
        QR(ws, 3, 7, 11, 15);
        QR(ws, 0, 5, 10, 15);
        QR(ws, 1, 6, 11, 12);
        QR(ws, 2, 7, 8, 13);
        QR(ws, 3, 4, 9, 14);
      }
      for (let i = 0; i < 16; i++) {
        ws[i] += state[i];
      }
      return new Uint8Array(ws.buffer, ws.byteOffset, ws.byteLength);
    }
    function rotl(a, b) {
      return a << b | a >>> 32 - b;
    }
    function QR(obj, a, b, c, d) {
      obj[a] += obj[b];
      obj[d] ^= obj[a];
      obj[d] = rotl(obj[d], 16);
      obj[c] += obj[d];
      obj[b] ^= obj[c];
      obj[b] = rotl(obj[b], 12);
      obj[a] += obj[b];
      obj[d] ^= obj[a];
      obj[d] = rotl(obj[d], 8);
      obj[c] += obj[d];
      obj[b] ^= obj[c];
      obj[b] = rotl(obj[b], 7);
    }
  }
});

// node_modules/sodium-javascript/crypto_stream_chacha20.js
var require_crypto_stream_chacha20 = __commonJS({
  "node_modules/sodium-javascript/crypto_stream_chacha20.js"(exports) {
    init_node_globals();
    var assert = require_nanoassert();
    var Chacha20 = require_chacha20_universal();
    if (new Uint16Array([1])[0] !== 1)
      throw new Error("Big endian architecture is not supported.");
    exports.crypto_stream_chacha20_KEYBYTES = 32;
    exports.crypto_stream_chacha20_NONCEBYTES = 8;
    exports.crypto_stream_chacha20_MESSAGEBYTES_MAX = Number.MAX_SAFE_INTEGER;
    exports.crypto_stream_chacha20_ietf_KEYBYTES = 32;
    exports.crypto_stream_chacha20_ietf_NONCEBYTES = 12;
    exports.crypto_stream_chacha20_ietf_MESSAGEBYTES_MAX = 2 ** 32;
    exports.crypto_stream_chacha20 = function(c, n, k) {
      c.fill(0);
      exports.crypto_stream_chacha20_xor(c, c, n, k);
    };
    exports.crypto_stream_chacha20_xor = function(c, m, n, k) {
      assert(n.byteLength === exports.crypto_stream_chacha20_NONCEBYTES, "n should be crypto_stream_chacha20_NONCEBYTES");
      assert(k.byteLength === exports.crypto_stream_chacha20_KEYBYTES, "k should be crypto_stream_chacha20_KEYBYTES");
      const xor = new Chacha20(n, k);
      xor.update(c, m);
      xor.final();
    };
    exports.crypto_stream_chacha20_xor_ic = function(c, m, n, ic, k) {
      assert(n.byteLength === exports.crypto_stream_chacha20_NONCEBYTES, "n should be crypto_stream_chacha20_NONCEBYTES");
      assert(k.byteLength === exports.crypto_stream_chacha20_KEYBYTES, "k should be crypto_stream_chacha20_KEYBYTES");
      const xor = new Chacha20(n, k, ic);
      xor.update(c, m);
      xor.final();
    };
    exports.crypto_stream_chacha20_xor_instance = function(n, k) {
      assert(n.byteLength === exports.crypto_stream_chacha20_NONCEBYTES, "n should be crypto_stream_chacha20_NONCEBYTES");
      assert(k.byteLength === exports.crypto_stream_chacha20_KEYBYTES, "k should be crypto_stream_chacha20_KEYBYTES");
      return new Chacha20(n, k);
    };
    exports.crypto_stream_chacha20_ietf = function(c, n, k) {
      c.fill(0);
      exports.crypto_stream_chacha20_ietf_xor(c, c, n, k);
    };
    exports.crypto_stream_chacha20_ietf_xor = function(c, m, n, k) {
      assert(n.byteLength === exports.crypto_stream_chacha20_ietf_NONCEBYTES, "n should be crypto_stream_chacha20_ietf_NONCEBYTES");
      assert(k.byteLength === exports.crypto_stream_chacha20_ietf_KEYBYTES, "k should be crypto_stream_chacha20_ietf_KEYBYTES");
      const xor = new Chacha20(n, k);
      xor.update(c, m);
      xor.final();
    };
    exports.crypto_stream_chacha20_ietf_xor_ic = function(c, m, n, ic, k) {
      assert(n.byteLength === exports.crypto_stream_chacha20_ietf_NONCEBYTES, "n should be crypto_stream_chacha20_ietf_NONCEBYTES");
      assert(k.byteLength === exports.crypto_stream_chacha20_ietf_KEYBYTES, "k should be crypto_stream_chacha20_ietf_KEYBYTES");
      const xor = new Chacha20(n, k, ic);
      xor.update(c, m);
      xor.final();
    };
    exports.crypto_stream_chacha20_ietf_xor_instance = function(n, k) {
      assert(n.byteLength === exports.crypto_stream_chacha20_ietf_NONCEBYTES, "n should be crypto_stream_chacha20_ietf_NONCEBYTES");
      assert(k.byteLength === exports.crypto_stream_chacha20_ietf_KEYBYTES, "k should be crypto_stream_chacha20_ietf_KEYBYTES");
      return new Chacha20(n, k);
    };
  }
});

// node_modules/sodium-javascript/crypto_aead.js
var require_crypto_aead = __commonJS({
  "node_modules/sodium-javascript/crypto_aead.js"(exports, module) {
    init_node_globals();
    var { crypto_stream_chacha20_ietf, crypto_stream_chacha20_ietf_xor_ic } = require_crypto_stream_chacha20();
    var { crypto_verify_16 } = require_crypto_verify();
    var Poly1305 = require_poly1305();
    var assert = require_nanoassert();
    var crypto_aead_chacha20poly1305_ietf_KEYBYTES = 32;
    var crypto_aead_chacha20poly1305_ietf_NSECBYTES = 0;
    var crypto_aead_chacha20poly1305_ietf_NPUBBYTES = 12;
    var crypto_aead_chacha20poly1305_ietf_ABYTES = 16;
    var crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX = Number.MAX_SAFE_INTEGER;
    var _pad0 = new Uint8Array(16);
    function crypto_aead_chacha20poly1305_ietf_encrypt(c, m, ad, nsec, npub, k) {
      if (ad === null)
        return crypto_aead_chacha20poly1305_ietf_encrypt(c, m, new Uint8Array(0), nsec, npub, k);
      assert(c.byteLength === m.byteLength + crypto_aead_chacha20poly1305_ietf_ABYTES, "ciphertext should be 'crypto_aead_chacha20poly1305_ietf_ABYTES' longer than message");
      assert(npub.byteLength === crypto_aead_chacha20poly1305_ietf_NPUBBYTES, "npub should be 'crypto_aead_chacha20poly1305_ietf_NPUBBYTES' long");
      assert(k.byteLength === crypto_aead_chacha20poly1305_ietf_KEYBYTES, "k should be 'crypto_aead_chacha20poly1305_ietf_KEYBYTES' long");
      assert(m.byteLength <= crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX, "message is too large");
      const ret = crypto_aead_chacha20poly1305_ietf_encrypt_detached(c.subarray(0, m.byteLength), c.subarray(m.byteLength), m, ad, nsec, npub, k);
      return m.byteLength + ret;
    }
    function crypto_aead_chacha20poly1305_ietf_encrypt_detached(c, mac, m, ad, nsec, npub, k) {
      if (ad === null)
        return crypto_aead_chacha20poly1305_ietf_encrypt_detached(c, mac, m, new Uint8Array(0), nsec, npub, k);
      assert(c.byteLength === m.byteLength, "ciphertext should be same length than message");
      assert(npub.byteLength === crypto_aead_chacha20poly1305_ietf_NPUBBYTES, "npub should be 'crypto_aead_chacha20poly1305_ietf_NPUBBYTES' long");
      assert(k.byteLength === crypto_aead_chacha20poly1305_ietf_KEYBYTES, "k should be 'crypto_aead_chacha20poly1305_ietf_KEYBYTES' long");
      assert(m.byteLength <= crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX, "message is too large");
      assert(mac.byteLength <= crypto_aead_chacha20poly1305_ietf_ABYTES, "mac should be 'crypto_aead_chacha20poly1305_ietf_ABYTES' long");
      const block0 = new Uint8Array(64);
      var slen = new Uint8Array(8);
      crypto_stream_chacha20_ietf(block0, npub, k);
      const poly = new Poly1305(block0);
      block0.fill(0);
      poly.update(ad, 0, ad.byteLength);
      poly.update(_pad0, 0, 16 - ad.byteLength & 15);
      crypto_stream_chacha20_ietf_xor_ic(c, m, npub, 1, k);
      poly.update(c, 0, m.byteLength);
      poly.update(_pad0, 0, 16 - m.byteLength & 15);
      write64LE(slen, 0, ad.byteLength);
      poly.update(slen, 0, slen.byteLength);
      write64LE(slen, 0, m.byteLength);
      poly.update(slen, 0, slen.byteLength);
      poly.finish(mac, 0);
      slen.fill(0);
      return crypto_aead_chacha20poly1305_ietf_ABYTES;
    }
    function crypto_aead_chacha20poly1305_ietf_decrypt(m, nsec, c, ad, npub, k) {
      if (ad === null)
        return crypto_aead_chacha20poly1305_ietf_decrypt(m, nsec, c, new Uint8Array(0), npub, k);
      assert(m.byteLength === c.byteLength - crypto_aead_chacha20poly1305_ietf_ABYTES, "message should be 'crypto_aead_chacha20poly1305_ietf_ABYTES' shorter than ciphertext");
      assert(npub.byteLength === crypto_aead_chacha20poly1305_ietf_NPUBBYTES, "npub should be 'crypto_aead_chacha20poly1305_ietf_NPUBBYTES' long");
      assert(k.byteLength === crypto_aead_chacha20poly1305_ietf_KEYBYTES, "k should be 'crypto_aead_chacha20poly1305_ietf_KEYBYTES' long");
      assert(m.byteLength <= crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX, "message is too large");
      if (c.byteLength < crypto_aead_chacha20poly1305_ietf_ABYTES)
        throw new Error("could not verify data");
      crypto_aead_chacha20poly1305_ietf_decrypt_detached(m, nsec, c.subarray(0, c.byteLength - crypto_aead_chacha20poly1305_ietf_ABYTES), c.subarray(c.byteLength - crypto_aead_chacha20poly1305_ietf_ABYTES), ad, npub, k);
      return c.byteLength - crypto_aead_chacha20poly1305_ietf_ABYTES;
    }
    function crypto_aead_chacha20poly1305_ietf_decrypt_detached(m, nsec, c, mac, ad, npub, k) {
      if (ad === null)
        return crypto_aead_chacha20poly1305_ietf_decrypt_detached(m, nsec, c, mac, new Uint8Array(0), npub, k);
      assert(c.byteLength === m.byteLength, "message should be same length than ciphertext");
      assert(npub.byteLength === crypto_aead_chacha20poly1305_ietf_NPUBBYTES, "npub should be 'crypto_aead_chacha20poly1305_ietf_NPUBBYTES' long");
      assert(k.byteLength === crypto_aead_chacha20poly1305_ietf_KEYBYTES, "k should be 'crypto_aead_chacha20poly1305_ietf_KEYBYTES' long");
      assert(m.byteLength <= crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX, "message is too large");
      assert(mac.byteLength <= crypto_aead_chacha20poly1305_ietf_ABYTES, "mac should be 'crypto_aead_chacha20poly1305_ietf_ABYTES' long");
      const block0 = new Uint8Array(64);
      const slen = new Uint8Array(8);
      const computed_mac = new Uint8Array(crypto_aead_chacha20poly1305_ietf_ABYTES);
      crypto_stream_chacha20_ietf(block0, npub, k);
      const poly = new Poly1305(block0);
      block0.fill(0);
      poly.update(ad, 0, ad.byteLength);
      poly.update(_pad0, 0, 16 - ad.byteLength & 15);
      const mlen = c.byteLength;
      poly.update(c, 0, mlen);
      poly.update(_pad0, 0, 16 - mlen & 15);
      write64LE(slen, 0, ad.byteLength);
      poly.update(slen, 0, slen.byteLength);
      write64LE(slen, 0, mlen);
      poly.update(slen, 0, slen.byteLength);
      poly.finish(computed_mac, 0);
      assert(computed_mac.byteLength === 16);
      const ret = crypto_verify_16(computed_mac, 0, mac, 0);
      computed_mac.fill(0);
      slen.fill(0);
      if (!ret) {
        m.fill(0);
        throw new Error("could not verify data");
      }
      crypto_stream_chacha20_ietf_xor_ic(m, c, npub, 1, k);
    }
    function write64LE(buf, offset, int) {
      buf.fill(0, 0, 8);
      const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
      view.setUint32(offset, int & 4294967295, true);
      view.setUint32(offset + 4, int / 2 ** 32 & 4294967295, true);
    }
    module.exports = {
      crypto_aead_chacha20poly1305_ietf_encrypt,
      crypto_aead_chacha20poly1305_ietf_encrypt_detached,
      crypto_aead_chacha20poly1305_ietf_decrypt,
      crypto_aead_chacha20poly1305_ietf_decrypt_detached,
      crypto_aead_chacha20poly1305_ietf_ABYTES,
      crypto_aead_chacha20poly1305_ietf_KEYBYTES,
      crypto_aead_chacha20poly1305_ietf_NPUBBYTES,
      crypto_aead_chacha20poly1305_ietf_NSECBYTES,
      crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX
    };
  }
});

// node_modules/sodium-javascript/internal/hchacha20.js
var require_hchacha20 = __commonJS({
  "node_modules/sodium-javascript/internal/hchacha20.js"(exports, module) {
    init_node_globals();
    var { sodium_malloc } = require_memory();
    var assert = require_nanoassert();
    if (new Uint16Array([1])[0] !== 1)
      throw new Error("Big endian architecture is not supported.");
    var crypto_core_hchacha20_OUTPUTBYTES = 32;
    var crypto_core_hchacha20_INPUTBYTES = 16;
    var crypto_core_hchacha20_KEYBYTES = 32;
    var crypto_core_hchacha20_CONSTBYTES = 16;
    function ROTL32(x, b) {
      x &= 4294967295;
      b &= 4294967295;
      return x << b | x >>> 32 - b;
    }
    function LOAD32_LE(src, offset) {
      assert(src instanceof Uint8Array, "src not byte array");
      let w = src[offset];
      w |= src[offset + 1] << 8;
      w |= src[offset + 2] << 16;
      w |= src[offset + 3] << 24;
      return w;
    }
    function STORE32_LE(dest, int, offset) {
      assert(dest instanceof Uint8Array, "dest not byte array");
      var mul = 1;
      var i = 0;
      dest[offset] = int & 255;
      while (++i < 4 && (mul *= 256)) {
        dest[offset + i] = int / mul & 255;
      }
    }
    function QUARTERROUND(l, A, B, C, D) {
      l[A] += l[B];
      l[D] = ROTL32(l[D] ^ l[A], 16);
      l[C] += l[D];
      l[B] = ROTL32(l[B] ^ l[C], 12);
      l[A] += l[B];
      l[D] = ROTL32(l[D] ^ l[A], 8);
      l[C] += l[D];
      l[B] = ROTL32(l[B] ^ l[C], 7);
    }
    function crypto_core_hchacha20(out, _in, k, c) {
      assert(out instanceof Uint8Array && out.length === 32, "out is not an array of 32 bytes");
      assert(k instanceof Uint8Array && k.length === 32, "k is not an array of 32 bytes");
      assert(c === null || c instanceof Uint8Array && c.length === 16, "c is not null or an array of 16 bytes");
      let i = 0;
      const x = new Uint32Array(16);
      if (!c) {
        x[0] = 1634760805;
        x[1] = 857760878;
        x[2] = 2036477234;
        x[3] = 1797285236;
      } else {
        x[0] = LOAD32_LE(c, 0);
        x[1] = LOAD32_LE(c, 4);
        x[2] = LOAD32_LE(c, 8);
        x[3] = LOAD32_LE(c, 12);
      }
      x[4] = LOAD32_LE(k, 0);
      x[5] = LOAD32_LE(k, 4);
      x[6] = LOAD32_LE(k, 8);
      x[7] = LOAD32_LE(k, 12);
      x[8] = LOAD32_LE(k, 16);
      x[9] = LOAD32_LE(k, 20);
      x[10] = LOAD32_LE(k, 24);
      x[11] = LOAD32_LE(k, 28);
      x[12] = LOAD32_LE(_in, 0);
      x[13] = LOAD32_LE(_in, 4);
      x[14] = LOAD32_LE(_in, 8);
      x[15] = LOAD32_LE(_in, 12);
      for (i = 0; i < 10; i++) {
        QUARTERROUND(x, 0, 4, 8, 12);
        QUARTERROUND(x, 1, 5, 9, 13);
        QUARTERROUND(x, 2, 6, 10, 14);
        QUARTERROUND(x, 3, 7, 11, 15);
        QUARTERROUND(x, 0, 5, 10, 15);
        QUARTERROUND(x, 1, 6, 11, 12);
        QUARTERROUND(x, 2, 7, 8, 13);
        QUARTERROUND(x, 3, 4, 9, 14);
      }
      STORE32_LE(out, x[0], 0);
      STORE32_LE(out, x[1], 4);
      STORE32_LE(out, x[2], 8);
      STORE32_LE(out, x[3], 12);
      STORE32_LE(out, x[12], 16);
      STORE32_LE(out, x[13], 20);
      STORE32_LE(out, x[14], 24);
      STORE32_LE(out, x[15], 28);
      return 0;
    }
    function crypto_core_hchacha20_outputbytes() {
      return crypto_core_hchacha20_OUTPUTBYTES;
    }
    function crypto_core_hchacha20_inputbytes() {
      return crypto_core_hchacha20_INPUTBYTES;
    }
    function crypto_core_hchacha20_keybytes() {
      return crypto_core_hchacha20_KEYBYTES;
    }
    function crypto_core_hchacha20_constbytes() {
      return crypto_core_hchacha20_CONSTBYTES;
    }
    module.exports = {
      crypto_core_hchacha20_INPUTBYTES,
      LOAD32_LE,
      STORE32_LE,
      QUARTERROUND,
      crypto_core_hchacha20,
      crypto_core_hchacha20_outputbytes,
      crypto_core_hchacha20_inputbytes,
      crypto_core_hchacha20_keybytes,
      crypto_core_hchacha20_constbytes
    };
  }
});

// node_modules/sodium-javascript/crypto_secretstream.js
var require_crypto_secretstream = __commonJS({
  "node_modules/sodium-javascript/crypto_secretstream.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var { randombytes_buf } = require_randombytes();
    var {
      crypto_stream_chacha20_ietf,
      crypto_stream_chacha20_ietf_xor,
      crypto_stream_chacha20_ietf_xor_ic,
      crypto_stream_chacha20_ietf_KEYBYTES
    } = require_crypto_stream_chacha20();
    var { crypto_core_hchacha20, crypto_core_hchacha20_INPUTBYTES } = require_hchacha20();
    var Poly1305 = require_poly1305();
    var { sodium_increment, sodium_is_zero, sodium_memcmp } = require_helpers();
    var crypto_onetimeauth_poly1305_BYTES = 16;
    var crypto_secretstream_xchacha20poly1305_COUNTERBYTES = 4;
    var crypto_secretstream_xchacha20poly1305_INONCEBYTES = 8;
    var crypto_aead_xchacha20poly1305_ietf_KEYBYTES = 32;
    var crypto_secretstream_xchacha20poly1305_KEYBYTES = crypto_aead_xchacha20poly1305_ietf_KEYBYTES;
    var crypto_aead_xchacha20poly1305_ietf_NPUBBYTES = 24;
    var crypto_secretstream_xchacha20poly1305_HEADERBYTES = crypto_aead_xchacha20poly1305_ietf_NPUBBYTES;
    var crypto_aead_xchacha20poly1305_ietf_ABYTES = 16;
    var crypto_secretstream_xchacha20poly1305_ABYTES = 1 + crypto_aead_xchacha20poly1305_ietf_ABYTES;
    var crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX = Number.MAX_SAFE_INTEGER;
    var crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX = Number.MAX_SAFE_INTEGER;
    var crypto_secretstream_xchacha20poly1305_TAGBYTES = 1;
    var crypto_secretstream_xchacha20poly1305_TAG_MESSAGE = new Uint8Array([0]);
    var crypto_secretstream_xchacha20poly1305_TAG_PUSH = new Uint8Array([1]);
    var crypto_secretstream_xchacha20poly1305_TAG_REKEY = new Uint8Array([2]);
    var crypto_secretstream_xchacha20poly1305_TAG_FINAL = new Uint8Array([crypto_secretstream_xchacha20poly1305_TAG_PUSH | crypto_secretstream_xchacha20poly1305_TAG_REKEY]);
    var crypto_secretstream_xchacha20poly1305_STATEBYTES = crypto_secretstream_xchacha20poly1305_KEYBYTES + crypto_secretstream_xchacha20poly1305_INONCEBYTES + crypto_secretstream_xchacha20poly1305_COUNTERBYTES + 8;
    var KEY_OFFSET = 0;
    var NONCE_OFFSET = crypto_secretstream_xchacha20poly1305_KEYBYTES;
    var PAD_OFFSET = NONCE_OFFSET + crypto_secretstream_xchacha20poly1305_INONCEBYTES + crypto_secretstream_xchacha20poly1305_COUNTERBYTES;
    var _pad0 = new Uint8Array(16);
    function STORE64_LE(dest, int) {
      let mul = 1;
      let i = 0;
      dest[0] = int & 255;
      while (++i < 8 && (mul *= 256)) {
        dest[i] = int / mul & 255;
      }
    }
    function crypto_secretstream_xchacha20poly1305_counter_reset(state) {
      assert(state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES, "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long");
      const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
      for (let i = 0; i < crypto_secretstream_xchacha20poly1305_COUNTERBYTES; i++) {
        nonce[i] = 0;
      }
      nonce[0] = 1;
    }
    function crypto_secretstream_xchacha20poly1305_keygen(k) {
      assert(k.length === crypto_secretstream_xchacha20poly1305_KEYBYTES);
      randombytes_buf(k);
    }
    function crypto_secretstream_xchacha20poly1305_init_push(state, out, key) {
      assert(state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES, "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long");
      assert(out instanceof Uint8Array && out.length === crypto_secretstream_xchacha20poly1305_HEADERBYTES, "out not byte array of length crypto_secretstream_xchacha20poly1305_HEADERBYTES");
      assert(key instanceof Uint8Array && key.length === crypto_secretstream_xchacha20poly1305_KEYBYTES, "key not byte array of length crypto_secretstream_xchacha20poly1305_KEYBYTES");
      const k = state.subarray(KEY_OFFSET, NONCE_OFFSET);
      const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
      const pad = state.subarray(PAD_OFFSET);
      randombytes_buf(out, crypto_secretstream_xchacha20poly1305_HEADERBYTES);
      crypto_core_hchacha20(k, out, key, null);
      crypto_secretstream_xchacha20poly1305_counter_reset(state);
      for (let i = 0; i < crypto_secretstream_xchacha20poly1305_INONCEBYTES; i++) {
        nonce[i + crypto_secretstream_xchacha20poly1305_COUNTERBYTES] = out[i + crypto_core_hchacha20_INPUTBYTES];
      }
      pad.fill(0);
    }
    function crypto_secretstream_xchacha20poly1305_init_pull(state, _in, key) {
      assert(state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES, "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long");
      assert(_in instanceof Uint8Array && _in.length === crypto_secretstream_xchacha20poly1305_HEADERBYTES, "_in not byte array of length crypto_secretstream_xchacha20poly1305_HEADERBYTES");
      assert(key instanceof Uint8Array && key.length === crypto_secretstream_xchacha20poly1305_KEYBYTES, "key not byte array of length crypto_secretstream_xchacha20poly1305_KEYBYTES");
      const k = state.subarray(KEY_OFFSET, NONCE_OFFSET);
      const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
      const pad = state.subarray(PAD_OFFSET);
      crypto_core_hchacha20(k, _in, key, null);
      crypto_secretstream_xchacha20poly1305_counter_reset(state);
      for (let i = 0; i < crypto_secretstream_xchacha20poly1305_INONCEBYTES; i++) {
        nonce[i + crypto_secretstream_xchacha20poly1305_COUNTERBYTES] = _in[i + crypto_core_hchacha20_INPUTBYTES];
      }
      pad.fill(0);
    }
    function crypto_secretstream_xchacha20poly1305_rekey(state) {
      assert(state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES, "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long");
      const k = state.subarray(KEY_OFFSET, NONCE_OFFSET);
      const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
      const new_key_and_inonce = new Uint8Array(crypto_stream_chacha20_ietf_KEYBYTES + crypto_secretstream_xchacha20poly1305_INONCEBYTES);
      let i;
      for (i = 0; i < crypto_stream_chacha20_ietf_KEYBYTES; i++) {
        new_key_and_inonce[i] = k[i];
      }
      for (i = 0; i < crypto_secretstream_xchacha20poly1305_INONCEBYTES; i++) {
        new_key_and_inonce[crypto_stream_chacha20_ietf_KEYBYTES + i] = nonce[crypto_secretstream_xchacha20poly1305_COUNTERBYTES + i];
      }
      crypto_stream_chacha20_ietf_xor(new_key_and_inonce, new_key_and_inonce, nonce, k);
      for (i = 0; i < crypto_stream_chacha20_ietf_KEYBYTES; i++) {
        k[i] = new_key_and_inonce[i];
      }
      for (i = 0; i < crypto_secretstream_xchacha20poly1305_INONCEBYTES; i++) {
        nonce[crypto_secretstream_xchacha20poly1305_COUNTERBYTES + i] = new_key_and_inonce[crypto_stream_chacha20_ietf_KEYBYTES + i];
      }
      crypto_secretstream_xchacha20poly1305_counter_reset(state);
    }
    function crypto_secretstream_xchacha20poly1305_push(state, out, m, ad, tag) {
      assert(state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES, "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long");
      if (!ad)
        ad = new Uint8Array(0);
      const k = state.subarray(KEY_OFFSET, NONCE_OFFSET);
      const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
      const block = new Uint8Array(64);
      const slen = new Uint8Array(8);
      assert(crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX <= crypto_aead_chacha20poly1305_ietf_MESSAGEBYTES_MAX);
      crypto_stream_chacha20_ietf(block, nonce, k);
      const poly = new Poly1305(block);
      block.fill(0);
      poly.update(ad, 0, ad.byteLength);
      poly.update(_pad0, 0, 16 - ad.byteLength & 15);
      block[0] = tag[0];
      crypto_stream_chacha20_ietf_xor_ic(block, block, nonce, 1, k);
      poly.update(block, 0, block.byteLength);
      out[0] = block[0];
      const c = out.subarray(1, out.byteLength);
      crypto_stream_chacha20_ietf_xor_ic(c, m, nonce, 2, k);
      poly.update(c, 0, m.byteLength);
      poly.update(_pad0, 0, 16 - block.byteLength + m.byteLength & 15);
      STORE64_LE(slen, ad.byteLength);
      poly.update(slen, 0, slen.byteLength);
      STORE64_LE(slen, block.byteLength + m.byteLength);
      poly.update(slen, 0, slen.byteLength);
      const mac = out.subarray(1 + m.byteLength, out.byteLength);
      poly.finish(mac, 0);
      assert(crypto_onetimeauth_poly1305_BYTES >= crypto_secretstream_xchacha20poly1305_INONCEBYTES);
      xor_buf(nonce.subarray(crypto_secretstream_xchacha20poly1305_COUNTERBYTES, nonce.length), mac, crypto_secretstream_xchacha20poly1305_INONCEBYTES);
      sodium_increment(nonce);
      if ((tag[0] & crypto_secretstream_xchacha20poly1305_TAG_REKEY) !== 0 || sodium_is_zero(nonce.subarray(0, crypto_secretstream_xchacha20poly1305_COUNTERBYTES))) {
        crypto_secretstream_xchacha20poly1305_rekey(state);
      }
      return crypto_secretstream_xchacha20poly1305_ABYTES + m.byteLength;
    }
    function crypto_secretstream_xchacha20poly1305_pull(state, m, tag, _in, ad) {
      assert(state.byteLength === crypto_secretstream_xchacha20poly1305_STATEBYTES, "state is should be crypto_secretstream_xchacha20poly1305_STATEBYTES long");
      if (!ad)
        ad = new Uint8Array(0);
      const k = state.subarray(KEY_OFFSET, NONCE_OFFSET);
      const nonce = state.subarray(NONCE_OFFSET, PAD_OFFSET);
      const block = new Uint8Array(64);
      const slen = new Uint8Array(8);
      const mac = new Uint8Array(crypto_onetimeauth_poly1305_BYTES);
      assert(_in.byteLength >= crypto_secretstream_xchacha20poly1305_ABYTES, "ciphertext is too short.");
      const mlen = _in.byteLength - crypto_secretstream_xchacha20poly1305_ABYTES;
      crypto_stream_chacha20_ietf(block, nonce, k);
      const poly = new Poly1305(block);
      block.fill(0);
      poly.update(ad, 0, ad.byteLength);
      poly.update(_pad0, 0, 16 - ad.byteLength & 15);
      block.fill(0);
      block[0] = _in[0];
      crypto_stream_chacha20_ietf_xor_ic(block, block, nonce, 1, k);
      tag[0] = block[0];
      block[0] = _in[0];
      poly.update(block, 0, block.byteLength);
      const c = _in.subarray(1, _in.length);
      poly.update(c, 0, mlen);
      poly.update(_pad0, 0, 16 - block.byteLength + mlen & 15);
      STORE64_LE(slen, ad.byteLength);
      poly.update(slen, 0, slen.byteLength);
      STORE64_LE(slen, block.byteLength + m.byteLength);
      poly.update(slen, 0, slen.byteLength);
      poly.finish(mac, 0);
      const stored_mac = _in.subarray(1 + mlen, _in.length);
      if (!sodium_memcmp(mac, stored_mac)) {
        mac.fill(0);
        throw new Error("MAC could not be verified.");
      }
      crypto_stream_chacha20_ietf_xor_ic(m, c.subarray(0, m.length), nonce, 2, k);
      xor_buf(nonce.subarray(crypto_secretstream_xchacha20poly1305_COUNTERBYTES, nonce.length), mac, crypto_secretstream_xchacha20poly1305_INONCEBYTES);
      sodium_increment(nonce);
      if ((tag & crypto_secretstream_xchacha20poly1305_TAG_REKEY) !== 0 || sodium_is_zero(nonce.subarray(0, crypto_secretstream_xchacha20poly1305_COUNTERBYTES))) {
        crypto_secretstream_xchacha20poly1305_rekey(state);
      }
      return mlen;
    }
    function xor_buf(out, _in, n) {
      for (let i = 0; i < n; i++) {
        out[i] ^= _in[i];
      }
    }
    module.exports = {
      crypto_secretstream_xchacha20poly1305_keygen,
      crypto_secretstream_xchacha20poly1305_init_push,
      crypto_secretstream_xchacha20poly1305_init_pull,
      crypto_secretstream_xchacha20poly1305_rekey,
      crypto_secretstream_xchacha20poly1305_push,
      crypto_secretstream_xchacha20poly1305_pull,
      crypto_secretstream_xchacha20poly1305_STATEBYTES,
      crypto_secretstream_xchacha20poly1305_ABYTES,
      crypto_secretstream_xchacha20poly1305_HEADERBYTES,
      crypto_secretstream_xchacha20poly1305_KEYBYTES,
      crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX,
      crypto_secretstream_xchacha20poly1305_TAGBYTES,
      crypto_secretstream_xchacha20poly1305_TAG_MESSAGE,
      crypto_secretstream_xchacha20poly1305_TAG_PUSH,
      crypto_secretstream_xchacha20poly1305_TAG_REKEY,
      crypto_secretstream_xchacha20poly1305_TAG_FINAL
    };
  }
});

// node_modules/siphash24/siphash24.js
var require_siphash24 = __commonJS({
  "node_modules/siphash24/siphash24.js"(exports, module) {
    init_node_globals();
    var __commonJS2 = (cb, mod) => function __require2() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __toBinary = /* @__PURE__ */ (() => {
      var table = new Uint8Array(128);
      for (var i = 0; i < 64; i++)
        table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
      return (base64) => {
        var n = base64.length, bytes2 = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
        for (var i2 = 0, j = 0; i2 < n; ) {
          var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
          var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
          bytes2[j++] = c0 << 2 | c1 >> 4;
          bytes2[j++] = c1 << 4 | c2 >> 2;
          bytes2[j++] = c2 << 6 | c3;
        }
        return bytes2;
      };
    })();
    var require_siphash243 = __commonJS2({
      "wasm-binary:./siphash24.wat"(exports2, module2) {
        module2.exports = __toBinary("AGFzbQEAAAABBgFgAn9/AAMCAQAFBQEBCpBOBxQCBm1lbW9yeQIAB3NpcGhhc2gAAArdCAHaCAIIfgJ/QvXKzYPXrNu38wAhAkLt3pHzlszct+QAIQNC4eSV89bs2bzsACEEQvPK0cunjNmy9AAhBUEIKQMAIQdBECkDACEIIAGtQjiGIQYgAUEHcSELIAAgAWogC2shCiAFIAiFIQUgBCAHhSEEIAMgCIUhAyACIAeFIQICQANAIAAgCkYNASAAKQMAIQkgBSAJhSEFIAIgA3whAiADQg2JIQMgAyAChSEDIAJCIIkhAiAEIAV8IQQgBUIQiSEFIAUgBIUhBSACIAV8IQIgBUIViSEFIAUgAoUhBSAEIAN8IQQgA0IRiSEDIAMgBIUhAyAEQiCJIQQgAiADfCECIANCDYkhAyADIAKFIQMgAkIgiSECIAQgBXwhBCAFQhCJIQUgBSAEhSEFIAIgBXwhAiAFQhWJIQUgBSAChSEFIAQgA3whBCADQhGJIQMgAyAEhSEDIARCIIkhBCACIAmFIQIgAEEIaiEADAALCwJAAkACQAJAAkACQAJAAkAgCw4HBwYFBAMCAQALIAYgADEABkIwhoQhBgsgBiAAMQAFQiiGhCEGCyAGIAAxAARCIIaEIQYLIAYgADEAA0IYhoQhBgsgBiAAMQACQhCGhCEGCyAGIAAxAAFCCIaEIQYLIAYgADEAAIQhBgsgBSAGhSEFIAIgA3whAiADQg2JIQMgAyAChSEDIAJCIIkhAiAEIAV8IQQgBUIQiSEFIAUgBIUhBSACIAV8IQIgBUIViSEFIAUgAoUhBSAEIAN8IQQgA0IRiSEDIAMgBIUhAyAEQiCJIQQgAiADfCECIANCDYkhAyADIAKFIQMgAkIgiSECIAQgBXwhBCAFQhCJIQUgBSAEhSEFIAIgBXwhAiAFQhWJIQUgBSAChSEFIAQgA3whBCADQhGJIQMgAyAEhSEDIARCIIkhBCACIAaFIQIgBEL/AYUhBCACIAN8IQIgA0INiSEDIAMgAoUhAyACQiCJIQIgBCAFfCEEIAVCEIkhBSAFIASFIQUgAiAFfCECIAVCFYkhBSAFIAKFIQUgBCADfCEEIANCEYkhAyADIASFIQMgBEIgiSEEIAIgA3whAiADQg2JIQMgAyAChSEDIAJCIIkhAiAEIAV8IQQgBUIQiSEFIAUgBIUhBSACIAV8IQIgBUIViSEFIAUgAoUhBSAEIAN8IQQgA0IRiSEDIAMgBIUhAyAEQiCJIQQgAiADfCECIANCDYkhAyADIAKFIQMgAkIgiSECIAQgBXwhBCAFQhCJIQUgBSAEhSEFIAIgBXwhAiAFQhWJIQUgBSAChSEFIAQgA3whBCADQhGJIQMgAyAEhSEDIARCIIkhBCACIAN8IQIgA0INiSEDIAMgAoUhAyACQiCJIQIgBCAFfCEEIAVCEIkhBSAFIASFIQUgAiAFfCECIAVCFYkhBSAFIAKFIQUgBCADfCEEIANCEYkhAyADIASFIQMgBEIgiSEEQQAgAiADIAQgBYWFhTcDAAs=");
      }
    });
    var bytes = require_siphash243();
    var compiled = new WebAssembly.Module(bytes);
    module.exports = (imports) => {
      const instance = new WebAssembly.Instance(compiled, imports);
      return instance.exports;
    };
  }
});

// node_modules/siphash24/fallback.js
var require_fallback = __commonJS({
  "node_modules/siphash24/fallback.js"(exports, module) {
    init_node_globals();
    module.exports = fallback;
    function _add(a, b) {
      var rl = a.l + b.l;
      var a2 = {
        h: a.h + b.h + (rl / 2 >>> 31) >>> 0,
        l: rl >>> 0
      };
      a.h = a2.h;
      a.l = a2.l;
    }
    function _xor(a, b) {
      a.h ^= b.h;
      a.h >>>= 0;
      a.l ^= b.l;
      a.l >>>= 0;
    }
    function _rotl(a, n) {
      var a2 = {
        h: a.h << n | a.l >>> 32 - n,
        l: a.l << n | a.h >>> 32 - n
      };
      a.h = a2.h;
      a.l = a2.l;
    }
    function _rotl32(a) {
      var al = a.l;
      a.l = a.h;
      a.h = al;
    }
    function _compress(v0, v1, v2, v3) {
      _add(v0, v1);
      _add(v2, v3);
      _rotl(v1, 13);
      _rotl(v3, 16);
      _xor(v1, v0);
      _xor(v3, v2);
      _rotl32(v0);
      _add(v2, v1);
      _add(v0, v3);
      _rotl(v1, 17);
      _rotl(v3, 21);
      _xor(v1, v2);
      _xor(v3, v0);
      _rotl32(v2);
    }
    function _get_int(a, offset) {
      return a[offset + 3] << 24 | a[offset + 2] << 16 | a[offset + 1] << 8 | a[offset];
    }
    function fallback(out, m, key) {
      var k0 = { h: _get_int(key, 4), l: _get_int(key, 0) };
      var k1 = { h: _get_int(key, 12), l: _get_int(key, 8) };
      var v0 = { h: k0.h, l: k0.l };
      var v2 = k0;
      var v1 = { h: k1.h, l: k1.l };
      var v3 = k1;
      var mi;
      var mp = 0;
      var ml = m.length;
      var ml7 = ml - 7;
      var buf = new Uint8Array(new ArrayBuffer(8));
      _xor(v0, { h: 1936682341, l: 1886610805 });
      _xor(v1, { h: 1685025377, l: 1852075885 });
      _xor(v2, { h: 1819895653, l: 1852142177 });
      _xor(v3, { h: 1952801890, l: 2037671283 });
      while (mp < ml7) {
        mi = { h: _get_int(m, mp + 4), l: _get_int(m, mp) };
        _xor(v3, mi);
        _compress(v0, v1, v2, v3);
        _compress(v0, v1, v2, v3);
        _xor(v0, mi);
        mp += 8;
      }
      buf[7] = ml;
      var ic = 0;
      while (mp < ml) {
        buf[ic++] = m[mp++];
      }
      while (ic < 7) {
        buf[ic++] = 0;
      }
      mi = {
        h: buf[7] << 24 | buf[6] << 16 | buf[5] << 8 | buf[4],
        l: buf[3] << 24 | buf[2] << 16 | buf[1] << 8 | buf[0]
      };
      _xor(v3, mi);
      _compress(v0, v1, v2, v3);
      _compress(v0, v1, v2, v3);
      _xor(v0, mi);
      _xor(v2, { h: 0, l: 255 });
      _compress(v0, v1, v2, v3);
      _compress(v0, v1, v2, v3);
      _compress(v0, v1, v2, v3);
      _compress(v0, v1, v2, v3);
      var h = v0;
      _xor(h, v1);
      _xor(h, v2);
      _xor(h, v3);
      out[0] = h.l & 255;
      out[1] = h.l >> 8 & 255;
      out[2] = h.l >> 16 & 255;
      out[3] = h.l >> 24 & 255;
      out[4] = h.h & 255;
      out[5] = h.h >> 8 & 255;
      out[6] = h.h >> 16 & 255;
      out[7] = h.h >> 24 & 255;
    }
  }
});

// node_modules/siphash24/index.js
var require_siphash242 = __commonJS({
  "node_modules/siphash24/index.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var wasm = typeof WebAssembly !== "undefined" && require_siphash24()();
    var fallback = require_fallback();
    module.exports = siphash24;
    var BYTES = siphash24.BYTES = 8;
    var KEYBYTES = siphash24.KEYBYTES = 16;
    siphash24.WASM_SUPPORTED = !!wasm;
    siphash24.WASM_LOADED = !!wasm;
    var memory = new Uint8Array(wasm.memory.buffer);
    function siphash24(data, key, out, noAssert) {
      if (!out)
        out = new Uint8Array(8);
      if (noAssert !== true) {
        assert(out.length >= BYTES, "output must be at least " + BYTES);
        assert(key.length >= KEYBYTES, "key must be at least " + KEYBYTES);
      }
      if (wasm) {
        if (data.length + 24 > memory.length)
          realloc(data.length + 24);
        memory.set(key, 8);
        memory.set(data, 24);
        wasm.siphash(24, data.length);
        out.set(memory.subarray(0, 8));
      } else {
        fallback(out, data, key);
      }
      return out;
    }
    function realloc(size) {
      wasm.memory.grow(Math.max(0, Math.ceil(Math.abs(size - memory.length) / 65536)));
      memory = new Uint8Array(wasm.memory.buffer);
    }
  }
});

// node_modules/sodium-javascript/crypto_shorthash.js
var require_crypto_shorthash = __commonJS({
  "node_modules/sodium-javascript/crypto_shorthash.js"(exports) {
    init_node_globals();
    var siphash = require_siphash242();
    if (new Uint16Array([1])[0] !== 1)
      throw new Error("Big endian architecture is not supported.");
    exports.crypto_shorthash_PRIMITIVE = "siphash24";
    exports.crypto_shorthash_BYTES = siphash.BYTES;
    exports.crypto_shorthash_KEYBYTES = siphash.KEYBYTES;
    exports.crypto_shorthash_WASM_SUPPORTED = siphash.WASM_SUPPORTED;
    exports.crypto_shorthash_WASM_LOADED = siphash.WASM_LOADED;
    exports.crypto_shorthash = shorthash;
    function shorthash(out, data, key, noAssert) {
      siphash(data, key, out, noAssert);
    }
  }
});

// node_modules/sodium-javascript/crypto_sign.js
var require_crypto_sign = __commonJS({
  "node_modules/sodium-javascript/crypto_sign.js"(exports, module) {
    init_node_globals();
    var { crypto_verify_32 } = require_crypto_verify();
    var { crypto_hash } = require_crypto_hash();
    var {
      gf,
      gf0,
      gf1,
      D,
      D2,
      X,
      Y,
      I,
      A,
      Z,
      M,
      S,
      sel25519,
      pack25519,
      inv25519,
      unpack25519
    } = require_ed25519();
    var { randombytes } = require_randombytes();
    var { crypto_scalarmult_BYTES } = require_crypto_scalarmult();
    var { crypto_hash_sha512_BYTES } = require_crypto_hash();
    var assert = require_nanoassert();
    var crypto_sign_ed25519_PUBLICKEYBYTES = 32;
    var crypto_sign_ed25519_SECRETKEYBYTES = 64;
    var crypto_sign_ed25519_SEEDBYTES = 32;
    var crypto_sign_ed25519_BYTES = 64;
    var crypto_sign_BYTES = crypto_sign_ed25519_BYTES;
    var crypto_sign_PUBLICKEYBYTES = crypto_sign_ed25519_PUBLICKEYBYTES;
    var crypto_sign_SECRETKEYBYTES = crypto_sign_ed25519_SECRETKEYBYTES;
    var crypto_sign_SEEDBYTES = crypto_sign_ed25519_SEEDBYTES;
    module.exports = {
      crypto_sign_keypair,
      crypto_sign_seed_keypair,
      crypto_sign,
      crypto_sign_detached,
      crypto_sign_open,
      crypto_sign_verify_detached,
      crypto_sign_BYTES,
      crypto_sign_PUBLICKEYBYTES,
      crypto_sign_SECRETKEYBYTES,
      crypto_sign_SEEDBYTES,
      crypto_sign_ed25519_PUBLICKEYBYTES,
      crypto_sign_ed25519_SECRETKEYBYTES,
      crypto_sign_ed25519_SEEDBYTES,
      crypto_sign_ed25519_BYTES,
      crypto_sign_ed25519_pk_to_curve25519,
      crypto_sign_ed25519_sk_to_curve25519,
      crypto_sign_ed25519_sk_to_pk,
      unpackneg,
      pack
    };
    function set25519(r, a) {
      for (let i = 0; i < 16; i++)
        r[i] = a[i] | 0;
    }
    function pow2523(o, i) {
      var c = gf();
      var a;
      for (a = 0; a < 16; a++)
        c[a] = i[a];
      for (a = 250; a >= 0; a--) {
        S(c, c);
        if (a !== 1)
          M(c, c, i);
      }
      for (a = 0; a < 16; a++)
        o[a] = c[a];
    }
    function add(p, q) {
      var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
      Z(a, p[1], p[0]);
      Z(t, q[1], q[0]);
      M(a, a, t);
      A(b, p[0], p[1]);
      A(t, q[0], q[1]);
      M(b, b, t);
      M(c, p[3], q[3]);
      M(c, c, D2);
      M(d, p[2], q[2]);
      A(d, d, d);
      Z(e, b, a);
      Z(f, d, c);
      A(g, d, c);
      A(h, b, a);
      M(p[0], e, f);
      M(p[1], h, g);
      M(p[2], g, f);
      M(p[3], e, h);
    }
    function cswap(p, q, b) {
      var i;
      for (i = 0; i < 4; i++) {
        sel25519(p[i], q[i], b);
      }
    }
    function pack(r, p) {
      var tx = gf(), ty = gf(), zi = gf();
      inv25519(zi, p[2]);
      M(tx, p[0], zi);
      M(ty, p[1], zi);
      pack25519(r, ty);
      r[31] ^= par25519(tx) << 7;
    }
    function scalarmult(p, q, s) {
      var h = [gf(q[0]), gf(q[1]), gf(q[2]), gf(q[3])];
      var b, i;
      set25519(p[0], gf0);
      set25519(p[1], gf1);
      set25519(p[2], gf1);
      set25519(p[3], gf0);
      for (i = 255; i >= 0; --i) {
        b = s[i / 8 | 0] >> (i & 7) & 1;
        cswap(p, h, b);
        add(h, p);
        add(p, p);
        cswap(p, h, b);
      }
    }
    function scalarbase(p, s) {
      var q = [gf(), gf(), gf(), gf()];
      set25519(q[0], X);
      set25519(q[1], Y);
      set25519(q[2], gf1);
      M(q[3], X, Y);
      scalarmult(p, q, s);
    }
    function crypto_sign_keypair(pk, sk, seeded) {
      check(pk, crypto_sign_PUBLICKEYBYTES);
      check(sk, crypto_sign_SECRETKEYBYTES);
      var d = new Uint8Array(64);
      var p = [gf(), gf(), gf(), gf()];
      var i;
      if (!seeded)
        randombytes(sk, 32);
      crypto_hash(d, sk, 32);
      d[0] &= 248;
      d[31] &= 127;
      d[31] |= 64;
      scalarbase(p, d);
      pack(pk, p);
      for (i = 0; i < 32; i++)
        sk[i + 32] = pk[i];
    }
    function crypto_sign_seed_keypair(pk, sk, seed) {
      check(seed, crypto_sign_SEEDBYTES);
      sk.set(seed);
      return crypto_sign_keypair(pk, sk, true);
    }
    var L = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
    function modL(r, x) {
      var carry, i, j, k;
      for (i = 63; i >= 32; --i) {
        carry = 0;
        for (j = i - 32, k = i - 12; j < k; ++j) {
          x[j] += carry - 16 * x[i] * L[j - (i - 32)];
          carry = x[j] + 128 >> 8;
          x[j] -= carry * 256;
        }
        x[j] += carry;
        x[i] = 0;
      }
      carry = 0;
      for (j = 0; j < 32; j++) {
        x[j] += carry - (x[31] >> 4) * L[j];
        carry = x[j] >> 8;
        x[j] &= 255;
      }
      for (j = 0; j < 32; j++)
        x[j] -= carry * L[j];
      for (i = 0; i < 32; i++) {
        x[i + 1] += x[i] >> 8;
        r[i] = x[i] & 255;
      }
    }
    function reduce(r) {
      var x = new Float64Array(64);
      for (let i = 0; i < 64; i++)
        x[i] = r[i];
      for (let i = 0; i < 64; i++)
        r[i] = 0;
      modL(r, x);
    }
    function crypto_sign(sm, m, sk) {
      check(sm, crypto_sign_BYTES + m.length);
      check(m, 0);
      check(sk, crypto_sign_SECRETKEYBYTES);
      var n = m.length;
      var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
      var i, j, x = new Float64Array(64);
      var p = [gf(), gf(), gf(), gf()];
      crypto_hash(d, sk, 32);
      d[0] &= 248;
      d[31] &= 127;
      d[31] |= 64;
      var smlen = n + 64;
      for (i = 0; i < n; i++)
        sm[64 + i] = m[i];
      for (i = 0; i < 32; i++)
        sm[32 + i] = d[32 + i];
      crypto_hash(r, sm.subarray(32), n + 32);
      reduce(r);
      scalarbase(p, r);
      pack(sm, p);
      for (i = 32; i < 64; i++)
        sm[i] = sk[i];
      crypto_hash(h, sm, n + 64);
      reduce(h);
      for (i = 0; i < 64; i++)
        x[i] = 0;
      for (i = 0; i < 32; i++)
        x[i] = r[i];
      for (i = 0; i < 32; i++) {
        for (j = 0; j < 32; j++) {
          x[i + j] += h[i] * d[j];
        }
      }
      modL(sm.subarray(32), x);
      return smlen;
    }
    function crypto_sign_detached(sig, m, sk) {
      var sm = new Uint8Array(m.length + crypto_sign_BYTES);
      crypto_sign(sm, m, sk);
      for (let i = 0; i < crypto_sign_BYTES; i++)
        sig[i] = sm[i];
    }
    function unpackneg(r, p) {
      var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
      set25519(r[2], gf1);
      unpack25519(r[1], p);
      S(num, r[1]);
      M(den, num, D);
      Z(num, num, r[2]);
      A(den, r[2], den);
      S(den2, den);
      S(den4, den2);
      M(den6, den4, den2);
      M(t, den6, num);
      M(t, t, den);
      pow2523(t, t);
      M(t, t, num);
      M(t, t, den);
      M(t, t, den);
      M(r[0], t, den);
      S(chk, r[0]);
      M(chk, chk, den);
      if (!neq25519(chk, num))
        M(r[0], r[0], I);
      S(chk, r[0]);
      M(chk, chk, den);
      if (!neq25519(chk, num))
        return false;
      if (par25519(r[0]) === p[31] >> 7) {
        Z(r[0], gf(), r[0]);
      }
      M(r[3], r[0], r[1]);
      return true;
    }
    function crypto_sign_open(msg, sm, pk) {
      check(msg, sm.length - crypto_sign_BYTES);
      check(sm, crypto_sign_BYTES);
      check(pk, crypto_sign_PUBLICKEYBYTES);
      var n = sm.length;
      var m = new Uint8Array(sm.length);
      var i, mlen;
      var t = new Uint8Array(32), h = new Uint8Array(64);
      var p = [gf(), gf(), gf(), gf()], q = [gf(), gf(), gf(), gf()];
      mlen = -1;
      if (n < 64)
        return false;
      if (!unpackneg(q, pk))
        return false;
      for (i = 0; i < n; i++)
        m[i] = sm[i];
      for (i = 0; i < 32; i++)
        m[i + 32] = pk[i];
      crypto_hash(h, m, n);
      reduce(h);
      scalarmult(p, q, h);
      scalarbase(q, sm.subarray(32));
      add(p, q);
      pack(t, p);
      n -= 64;
      if (!crypto_verify_32(sm, 0, t, 0)) {
        for (i = 0; i < n; i++)
          m[i] = 0;
        return false;
      }
      for (i = 0; i < n; i++)
        msg[i] = sm[i + 64];
      mlen = n;
      return true;
    }
    function crypto_sign_verify_detached(sig, m, pk) {
      check(sig, crypto_sign_BYTES);
      var sm = new Uint8Array(m.length + crypto_sign_BYTES);
      var i = 0;
      for (i = 0; i < crypto_sign_BYTES; i++)
        sm[i] = sig[i];
      for (i = 0; i < m.length; i++)
        sm[i + crypto_sign_BYTES] = m[i];
      return crypto_sign_open(m, sm, pk);
    }
    function par25519(a) {
      var d = new Uint8Array(32);
      pack25519(d, a);
      return d[0] & 1;
    }
    function neq25519(a, b) {
      var c = new Uint8Array(32), d = new Uint8Array(32);
      pack25519(c, a);
      pack25519(d, b);
      return crypto_verify_32(c, 0, d, 0);
    }
    function ed25519_mul_l(p, q) {
      scalarmult(p, q, L);
    }
    function ed25519_is_on_main_subgroup(p) {
      var pl = [gf(), gf(), gf(), gf()];
      ed25519_mul_l(pl, p);
      var zero = 0;
      for (let i = 0; i < 16; i++) {
        zero |= pl[0][i] & 65535;
      }
      return zero === 0;
    }
    function crypto_sign_ed25519_pk_to_curve25519(x25519_pk, ed25519_pk) {
      check(x25519_pk, crypto_sign_PUBLICKEYBYTES);
      check(ed25519_pk, crypto_sign_ed25519_PUBLICKEYBYTES);
      var a = [gf(), gf(), gf(), gf()];
      var x = gf([1]);
      var one_minus_y = gf([1]);
      assert(isSmallOrder(ed25519_pk) && unpackneg(a, ed25519_pk) && ed25519_is_on_main_subgroup(a), "Cannot convert key: bad point");
      for (let i = 0; i < a.length; i++) {
        pack25519(x25519_pk, a[i]);
      }
      Z(one_minus_y, one_minus_y, a[1]);
      A(x, x, a[1]);
      inv25519(one_minus_y, one_minus_y);
      M(x, x, one_minus_y);
      pack25519(x25519_pk, x);
      return 0;
    }
    function isSmallOrder(s) {
      Uint8Array.from([]);
      var bad_points = [
        Uint8Array.from([
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]),
        Uint8Array.from([
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]),
        Uint8Array.from([
          38,
          232,
          149,
          143,
          194,
          178,
          39,
          176,
          69,
          195,
          244,
          137,
          242,
          239,
          152,
          240,
          213,
          223,
          172,
          5,
          211,
          198,
          51,
          57,
          177,
          56,
          2,
          136,
          109,
          83,
          252,
          5
        ]),
        Uint8Array.from([
          199,
          23,
          106,
          112,
          61,
          77,
          216,
          79,
          186,
          60,
          11,
          118,
          13,
          16,
          103,
          15,
          42,
          32,
          83,
          250,
          44,
          57,
          204,
          198,
          78,
          199,
          253,
          119,
          146,
          172,
          3,
          122
        ]),
        Uint8Array.from([
          236,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          127
        ]),
        Uint8Array.from([
          237,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          127
        ]),
        Uint8Array.from([
          238,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          255,
          127
        ])
      ];
      var c = new Uint8Array(7);
      var j;
      check(bad_points, 7);
      for (let i = 0; i < bad_points.length; i++) {
        for (j = 0; j < 31; j++) {
          c[i] |= s[j] ^ bad_points[i][j];
        }
      }
      for (let i = 0; i < bad_points.length; i++) {
        c[i] |= s[j] & 127 ^ bad_points[i][j];
      }
      var k = 0;
      for (let i = 0; i < bad_points.length; i++) {
        k |= c[i] - 1;
      }
      return (k >> 8 & 1) === 0;
    }
    function crypto_sign_ed25519_sk_to_pk(pk, sk) {
      check(pk, crypto_sign_ed25519_PUBLICKEYBYTES);
      pk.set(sk.subarray(crypto_sign_ed25519_SEEDBYTES));
      return pk;
    }
    function crypto_sign_ed25519_sk_to_curve25519(curveSk, edSk) {
      assert(curveSk && curveSk.byteLength === crypto_scalarmult_BYTES, "curveSk must be 'crypto_sign_SECRETKEYBYTES' long");
      assert(edSk && edSk.byteLength === crypto_sign_ed25519_SECRETKEYBYTES, "edSk must be 'crypto_sign_ed25519_SECRETKEYBYTES' long");
      var h = new Uint8Array(crypto_hash_sha512_BYTES);
      crypto_hash(h, edSk, 32);
      h[0] &= 248;
      h[31] &= 127;
      h[31] |= 64;
      curveSk.set(h.subarray(0, crypto_scalarmult_BYTES));
      h.fill(0);
      return curveSk;
    }
    function check(buf, len, arg = "Argument") {
      if (!buf || len && buf.length < len)
        throw new Error(arg + " must be a buffer" + (len ? " of length " + len : ""));
    }
  }
});

// node_modules/sodium-javascript/index.js
var require_sodium_javascript = __commonJS({
  "node_modules/sodium-javascript/index.js"(exports, module) {
    "use strict";
    init_node_globals();
    forward(require_randombytes());
    forward(require_memory());
    forward(require_helpers());
    forward(require_crypto_verify());
    forward(require_crypto_auth());
    forward(require_crypto_box());
    forward(require_crypto_generichash());
    forward(require_crypto_hash());
    forward(require_crypto_hash_sha256());
    forward(require_crypto_kdf());
    forward(require_crypto_kx());
    forward(require_crypto_aead());
    forward(require_crypto_onetimeauth());
    forward(require_crypto_scalarmult());
    forward(require_crypto_secretbox());
    forward(require_crypto_secretstream());
    forward(require_crypto_shorthash());
    forward(require_crypto_sign());
    forward(require_crypto_stream());
    forward(require_crypto_stream_chacha20());
    function forward(submodule) {
      Object.keys(submodule).forEach(function(prop) {
        module.exports[prop] = submodule[prop];
      });
    }
  }
});

// node_modules/sodium-universal/index.js
var require_sodium_universal = __commonJS({
  "node_modules/sodium-universal/index.js"(exports, module) {
    init_node_globals();
    module.exports = require_sodium_javascript();
  }
});

// node_modules/uint64be/index.js
var require_uint64be = __commonJS({
  "node_modules/uint64be/index.js"(exports) {
    init_node_globals();
    var UINT_32_MAX = Math.pow(2, 32);
    exports.encodingLength = function() {
      return 8;
    };
    exports.encode = function(num, buf, offset) {
      if (!buf)
        buf = Buffer2.allocUnsafe(8);
      if (!offset)
        offset = 0;
      const top = Math.floor(num / UINT_32_MAX);
      const rem = num - top * UINT_32_MAX;
      buf.writeUInt32BE(top, offset);
      buf.writeUInt32BE(rem, offset + 4);
      return buf;
    };
    exports.decode = function(buf, offset) {
      if (!offset)
        offset = 0;
      const top = buf.readUInt32BE(offset);
      const rem = buf.readUInt32BE(offset + 4);
      return top * UINT_32_MAX + rem;
    };
    exports.encode.bytes = 8;
    exports.decode.bytes = 8;
  }
});

// node_modules/hypercore-crypto/index.js
var require_hypercore_crypto = __commonJS({
  "node_modules/hypercore-crypto/index.js"(exports) {
    init_node_globals();
    var sodium = require_sodium_universal();
    var uint64be = require_uint64be();
    var LEAF_TYPE = Buffer2.from([0]);
    var PARENT_TYPE = Buffer2.from([1]);
    var ROOT_TYPE = Buffer2.from([2]);
    var CAP_TYPE = Buffer2.from([3]);
    var HYPERCORE = Buffer2.from("hypercore");
    var HYPERCORE_CAP = Buffer2.from("hypercore capability");
    exports.writerCapability = function(key, secretKey, split) {
      if (!split)
        return null;
      const out = Buffer2.allocUnsafe(32);
      sodium.crypto_generichash_batch(out, [
        CAP_TYPE,
        HYPERCORE_CAP,
        split.tx.slice(0, 32),
        key
      ], split.rx.slice(0, 32));
      return exports.sign(out, secretKey);
    };
    exports.verifyRemoteWriterCapability = function(key, cap, split) {
      if (!split)
        return null;
      const out = Buffer2.allocUnsafe(32);
      sodium.crypto_generichash_batch(out, [
        CAP_TYPE,
        HYPERCORE_CAP,
        split.rx.slice(0, 32),
        key
      ], split.tx.slice(0, 32));
      return exports.verify(out, cap, key);
    };
    exports.capability = function(key, split) {
      if (!split)
        return null;
      const out = Buffer2.allocUnsafe(32);
      sodium.crypto_generichash_batch(out, [
        HYPERCORE_CAP,
        split.tx.slice(0, 32),
        key
      ], split.rx.slice(0, 32));
      return out;
    };
    exports.remoteCapability = function(key, split) {
      if (!split)
        return null;
      const out = Buffer2.allocUnsafe(32);
      sodium.crypto_generichash_batch(out, [
        HYPERCORE_CAP,
        split.rx.slice(0, 32),
        key
      ], split.tx.slice(0, 32));
      return out;
    };
    exports.keyPair = function(seed) {
      const publicKey = Buffer2.allocUnsafe(sodium.crypto_sign_PUBLICKEYBYTES);
      const secretKey = Buffer2.allocUnsafe(sodium.crypto_sign_SECRETKEYBYTES);
      if (seed)
        sodium.crypto_sign_seed_keypair(publicKey, secretKey, seed);
      else
        sodium.crypto_sign_keypair(publicKey, secretKey);
      return {
        publicKey,
        secretKey
      };
    };
    exports.validateKeyPair = function(keyPair) {
      const pk = Buffer2.allocUnsafe(sodium.crypto_sign_PUBLICKEYBYTES);
      sodium.crypto_sign_ed25519_sk_to_pk(pk, keyPair.secretKey);
      return pk.equals(keyPair.publicKey);
    };
    exports.sign = function(message, secretKey) {
      const signature = Buffer2.allocUnsafe(sodium.crypto_sign_BYTES);
      sodium.crypto_sign_detached(signature, message, secretKey);
      return signature;
    };
    exports.verify = function(message, signature, publicKey) {
      return sodium.crypto_sign_verify_detached(signature, message, publicKey);
    };
    exports.data = function(data) {
      const out = Buffer2.allocUnsafe(32);
      sodium.crypto_generichash_batch(out, [
        LEAF_TYPE,
        encodeUInt64(data.length),
        data
      ]);
      return out;
    };
    exports.leaf = function(leaf) {
      return exports.data(leaf.data);
    };
    exports.parent = function(a, b) {
      if (a.index > b.index) {
        const tmp = a;
        a = b;
        b = tmp;
      }
      const out = Buffer2.allocUnsafe(32);
      sodium.crypto_generichash_batch(out, [
        PARENT_TYPE,
        encodeUInt64(a.size + b.size),
        a.hash,
        b.hash
      ]);
      return out;
    };
    exports.tree = function(roots, out) {
      const buffers = new Array(3 * roots.length + 1);
      var j = 0;
      buffers[j++] = ROOT_TYPE;
      for (var i = 0; i < roots.length; i++) {
        const r = roots[i];
        buffers[j++] = r.hash;
        buffers[j++] = encodeUInt64(r.index);
        buffers[j++] = encodeUInt64(r.size);
      }
      if (!out)
        out = Buffer2.allocUnsafe(32);
      sodium.crypto_generichash_batch(out, buffers);
      return out;
    };
    exports.signable = function(roots, length) {
      const out = Buffer2.allocUnsafe(40);
      if (Buffer2.isBuffer(roots))
        roots.copy(out);
      else
        exports.tree(roots, out.slice(0, 32));
      uint64be.encode(length, out.slice(32));
      return out;
    };
    exports.randomBytes = function(n) {
      const buf = Buffer2.allocUnsafe(n);
      sodium.randombytes_buf(buf);
      return buf;
    };
    exports.discoveryKey = function(publicKey) {
      const digest = Buffer2.allocUnsafe(32);
      sodium.crypto_generichash(digest, HYPERCORE, publicKey);
      return digest;
    };
    if (sodium.sodium_free) {
      exports.free = function(secureBuf) {
        if (secureBuf.secure)
          sodium.sodium_free(secureBuf);
      };
    } else {
      exports.free = function() {
      };
    }
    function encodeUInt64(n) {
      return uint64be.encode(n, Buffer2.allocUnsafe(8));
    }
  }
});

// node_modules/random-access-file/browser.js
var require_browser3 = __commonJS({
  "node_modules/random-access-file/browser.js"(exports, module) {
    init_node_globals();
    module.exports = function() {
      throw new Error("random-access-file is not supported in the browser");
    };
  }
});

// node_modules/is-options/index.js
var require_is_options = __commonJS({
  "node_modules/is-options/index.js"(exports, module) {
    init_node_globals();
    var b4a = require_browser2();
    module.exports = function isOptions(opts) {
      return typeof opts === "object" && opts && !b4a.isBuffer(opts);
    };
  }
});

// node_modules/compact-encoding/index.js
var require_compact_encoding = __commonJS({
  "node_modules/compact-encoding/index.js"(exports) {
    init_node_globals();
    var b4a = require_browser2();
    var LE = new Uint8Array(new Uint16Array([255]).buffer)[0] === 255;
    var BE = !LE;
    exports.state = function() {
      return { start: 0, end: 0, buffer: null };
    };
    var uint = exports.uint = {
      preencode(state, n) {
        state.end += n <= 252 ? 1 : n <= 65535 ? 3 : n <= 4294967295 ? 5 : 9;
      },
      encode(state, n) {
        if (n <= 252)
          uint8.encode(state, n);
        else if (n <= 65535) {
          state.buffer[state.start++] = 253;
          uint16.encode(state, n);
        } else if (n <= 4294967295) {
          state.buffer[state.start++] = 254;
          uint32.encode(state, n);
        } else {
          state.buffer[state.start++] = 255;
          uint64.encode(state, n);
        }
      },
      decode(state) {
        const a = uint8.decode(state);
        if (a <= 252)
          return a;
        if (a === 253)
          return uint16.decode(state);
        if (a === 254)
          return uint32.decode(state);
        return uint64.decode(state);
      }
    };
    var uint8 = exports.uint8 = {
      preencode(state, n) {
        state.end += 1;
      },
      encode(state, n) {
        state.buffer[state.start++] = n;
      },
      decode(state) {
        if (state.start >= state.end)
          throw new Error("Out of bounds");
        return state.buffer[state.start++];
      }
    };
    var uint16 = exports.uint16 = {
      preencode(state, n) {
        state.end += 2;
      },
      encode(state, n) {
        state.buffer[state.start++] = n;
        state.buffer[state.start++] = n >>> 8;
      },
      decode(state) {
        if (state.end - state.start < 2)
          throw new Error("Out of bounds");
        return state.buffer[state.start++] + state.buffer[state.start++] * 256;
      }
    };
    var uint24 = exports.uint24 = {
      preencode(state, n) {
        state.end += 3;
      },
      encode(state, n) {
        state.buffer[state.start++] = n;
        state.buffer[state.start++] = n >>> 8;
        state.buffer[state.start++] = n >>> 16;
      },
      decode(state) {
        if (state.end - state.start < 3)
          throw new Error("Out of bounds");
        return state.buffer[state.start++] + state.buffer[state.start++] * 256 + state.buffer[state.start++] * 65536;
      }
    };
    var uint32 = exports.uint32 = {
      preencode(state, n) {
        state.end += 4;
      },
      encode(state, n) {
        state.buffer[state.start++] = n;
        state.buffer[state.start++] = n >>> 8;
        state.buffer[state.start++] = n >>> 16;
        state.buffer[state.start++] = n >>> 24;
      },
      decode(state) {
        if (state.end - state.start < 4)
          throw new Error("Out of bounds");
        return state.buffer[state.start++] + state.buffer[state.start++] * 256 + state.buffer[state.start++] * 65536 + state.buffer[state.start++] * 16777216;
      }
    };
    var uint64 = exports.uint64 = {
      preencode(state, n) {
        state.end += 8;
      },
      encode(state, n) {
        const r = Math.floor(n / 4294967296);
        uint32.encode(state, n);
        uint32.encode(state, r);
      },
      decode(state) {
        if (state.end - state.start < 8)
          throw new Error("Out of bounds");
        return uint32.decode(state) + 4294967296 * uint32.decode(state);
      }
    };
    exports.int = zigZag(uint);
    exports.int8 = zigZag(uint8);
    exports.int16 = zigZag(uint16);
    exports.int24 = zigZag(uint24);
    exports.int32 = zigZag(uint32);
    exports.int64 = zigZag(uint64);
    exports.float32 = {
      preencode(state, n) {
        state.end += 4;
      },
      encode(state, n) {
        const view = new DataView(state.buffer.buffer, state.start + state.buffer.byteOffset, 4);
        view.setFloat32(0, n, true);
        state.start += 4;
      },
      decode(state) {
        if (state.end - state.start < 4)
          throw new Error("Out of bounds");
        const view = new DataView(state.buffer.buffer, state.start + state.buffer.byteOffset, 4);
        const float = view.getFloat32(0, true);
        state.start += 4;
        return float;
      }
    };
    exports.float64 = {
      preencode(state, n) {
        state.end += 8;
      },
      encode(state, n) {
        const view = new DataView(state.buffer.buffer, state.start + state.buffer.byteOffset, 8);
        view.setFloat64(0, n, true);
        state.start += 8;
      },
      decode(state) {
        if (state.end - state.start < 8)
          throw new Error("Out of bounds");
        const view = new DataView(state.buffer.buffer, state.start + state.buffer.byteOffset, 8);
        const float = view.getFloat64(0, true);
        state.start += 8;
        return float;
      }
    };
    exports.buffer = {
      preencode(state, b) {
        if (b)
          uint8array.preencode(state, b);
        else
          state.end++;
      },
      encode(state, b) {
        if (b)
          uint8array.encode(state, b);
        else
          state.buffer[state.start++] = 0;
      },
      decode(state) {
        const len = uint.decode(state);
        if (len === 0)
          return null;
        if (state.end - state.start < len)
          throw new Error("Out of bounds");
        return state.buffer.subarray(state.start, state.start += len);
      }
    };
    var raw = exports.raw = {
      preencode(state, b) {
        state.end += b.byteLength;
      },
      encode(state, b) {
        state.buffer.set(b, state.start);
        state.start += b.byteLength;
      },
      decode(state) {
        const b = state.buffer.subarray(state.start, state.end);
        state.start = state.end;
        return b;
      }
    };
    function typedarray(TypedArray, swap) {
      const n = TypedArray.BYTES_PER_ELEMENT;
      return {
        preencode(state, b) {
          uint.preencode(state, b.length);
          state.end += b.byteLength;
        },
        encode(state, b) {
          uint.encode(state, b.length);
          const view = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
          if (BE && swap)
            swap(view);
          state.buffer.set(view, state.start);
          state.start += b.byteLength;
        },
        decode(state) {
          const len = uint.decode(state);
          let b = state.buffer.subarray(state.start, state.start += len * n);
          if (b.byteLength !== len * n)
            throw new Error("Out of bounds");
          if (b.byteOffset % n !== 0)
            b = new Uint8Array(b);
          if (BE && swap)
            swap(b);
          return new TypedArray(b.buffer, b.byteOffset, b.byteLength / n);
        }
      };
    }
    var uint8array = exports.uint8array = typedarray(Uint8Array);
    exports.uint16array = typedarray(Uint16Array, b4a.swap16);
    exports.uint32array = typedarray(Uint32Array, b4a.swap32);
    exports.int8array = typedarray(Int8Array);
    exports.int16array = typedarray(Int16Array, b4a.swap16);
    exports.int32array = typedarray(Int32Array, b4a.swap32);
    exports.float32array = typedarray(Float32Array, b4a.swap32);
    exports.float64array = typedarray(Float64Array, b4a.swap64);
    exports.string = {
      preencode(state, s) {
        const len = b4a.byteLength(s);
        uint.preencode(state, len);
        state.end += len;
      },
      encode(state, s) {
        const len = b4a.byteLength(s);
        uint.encode(state, len);
        b4a.write(state.buffer, s, state.start);
        state.start += len;
      },
      decode(state) {
        const len = uint.decode(state);
        if (state.end - state.start < len)
          throw new Error("Out of bounds");
        return b4a.toString(state.buffer, "utf-8", state.start, state.start += len);
      }
    };
    exports.bool = {
      preencode(state, b) {
        state.end++;
      },
      encode(state, b) {
        state.buffer[state.start++] = b ? 1 : 0;
      },
      decode(state) {
        if (state.start >= state.end)
          throw Error("Out of bounds");
        return state.buffer[state.start++] === 1;
      }
    };
    var fixed = exports.fixed = function fixed2(n) {
      return {
        preencode(state, s) {
          state.end += n;
        },
        encode(state, s) {
          state.buffer.set(s, state.start);
          state.start += n;
        },
        decode(state) {
          if (state.end - state.start < n)
            throw new Error("Out of bounds");
          return state.buffer.subarray(state.start, state.start += n);
        }
      };
    };
    exports.fixed32 = fixed(32);
    exports.fixed64 = fixed(64);
    exports.none = {
      preencode(state, m) {
      },
      encode(state, m) {
      },
      decode(state) {
        return null;
      }
    };
    exports.array = function array(enc) {
      return {
        preencode(state, list) {
          uint.preencode(state, list.length);
          for (let i = 0; i < list.length; i++)
            enc.preencode(state, list[i]);
        },
        encode(state, list) {
          uint.encode(state, list.length);
          for (let i = 0; i < list.length; i++)
            enc.encode(state, list[i]);
        },
        decode(state) {
          const len = uint.decode(state);
          if (len > 1048576)
            throw new Error("Array is too big");
          const arr = new Array(len);
          for (let i = 0; i < len; i++)
            arr[i] = enc.decode(state);
          return arr;
        }
      };
    };
    exports.from = function from(enc) {
      if (enc.preencode)
        return enc;
      if (enc.encodingLength)
        return fromAbstractEncoder(enc);
      return fromCodec(enc);
    };
    function fromCodec(enc) {
      let tmpM = null;
      let tmpBuf = null;
      return {
        preencode(state, m) {
          tmpM = m;
          tmpBuf = enc.encode(m);
          state.end += tmpBuf.byteLength;
        },
        encode(state, m) {
          raw.encode(state, m === tmpM ? tmpBuf : enc.encode(m));
          tmpM = tmpBuf = null;
        },
        decode(state) {
          return enc.decode(raw.decode(state));
        }
      };
    }
    function fromAbstractEncoder(enc) {
      return {
        preencode(state, m) {
          state.end += enc.encodingLength(m);
        },
        encode(state, m) {
          enc.encode(m, state.buffer, state.start);
          state.start += enc.encode.bytes;
        },
        decode(state) {
          const m = enc.decode(state.buffer, state.start, state.end);
          state.start += enc.decode.bytes;
          return m;
        }
      };
    }
    exports.encode = function encode(enc, m) {
      const state = { start: 0, end: 0, buffer: null };
      enc.preencode(state, m);
      state.buffer = b4a.allocUnsafe(state.end);
      enc.encode(state, m);
      return state.buffer;
    };
    exports.decode = function decode(enc, buffer) {
      return enc.decode({ start: 0, end: buffer.byteLength, buffer });
    };
    function zigZag(enc) {
      return {
        preencode(state, n) {
          enc.preencode(state, zigZagEncode(n));
        },
        encode(state, n) {
          enc.encode(state, zigZagEncode(n));
        },
        decode(state) {
          return zigZagDecode(enc.decode(state));
        }
      };
    }
    function zigZagDecode(n) {
      return n === 0 ? n : (n & 1) === 0 ? n / 2 : -(n + 1) / 2;
    }
    function zigZagEncode(n) {
      return n < 0 ? 2 * -n - 1 : n === 0 ? 0 : 2 * n;
    }
  }
});

// node_modules/hypercore/node_modules/hypercore-crypto/index.js
var require_hypercore_crypto2 = __commonJS({
  "node_modules/hypercore/node_modules/hypercore-crypto/index.js"(exports) {
    init_node_globals();
    var sodium = require_sodium_universal();
    var c = require_compact_encoding();
    var b4a = require_browser2();
    var LEAF_TYPE = b4a.from([0]);
    var PARENT_TYPE = b4a.from([1]);
    var ROOT_TYPE = b4a.from([2]);
    var HYPERCORE = b4a.from("hypercore");
    exports.keyPair = function(seed) {
      const publicKey = b4a.allocUnsafe(sodium.crypto_sign_PUBLICKEYBYTES);
      const secretKey = b4a.allocUnsafe(sodium.crypto_sign_SECRETKEYBYTES);
      if (seed)
        sodium.crypto_sign_seed_keypair(publicKey, secretKey, seed);
      else
        sodium.crypto_sign_keypair(publicKey, secretKey);
      return {
        publicKey,
        secretKey
      };
    };
    exports.validateKeyPair = function(keyPair) {
      const pk = b4a.allocUnsafe(sodium.crypto_sign_PUBLICKEYBYTES);
      sodium.crypto_sign_ed25519_sk_to_pk(pk, keyPair.secretKey);
      return b4a.equals(pk, keyPair.publicKey);
    };
    exports.sign = function(message, secretKey) {
      const signature = b4a.allocUnsafe(sodium.crypto_sign_BYTES);
      sodium.crypto_sign_detached(signature, message, secretKey);
      return signature;
    };
    exports.verify = function(message, signature, publicKey) {
      return sodium.crypto_sign_verify_detached(signature, message, publicKey);
    };
    exports.data = function(data) {
      const out = b4a.allocUnsafe(32);
      sodium.crypto_generichash_batch(out, [
        LEAF_TYPE,
        c.encode(c.uint64, data.byteLength),
        data
      ]);
      return out;
    };
    exports.parent = function(a, b) {
      if (a.index > b.index) {
        const tmp = a;
        a = b;
        b = tmp;
      }
      const out = b4a.allocUnsafe(32);
      sodium.crypto_generichash_batch(out, [
        PARENT_TYPE,
        c.encode(c.uint64, a.size + b.size),
        a.hash,
        b.hash
      ]);
      return out;
    };
    exports.tree = function(roots, out) {
      const buffers = new Array(3 * roots.length + 1);
      let j = 0;
      buffers[j++] = ROOT_TYPE;
      for (let i = 0; i < roots.length; i++) {
        const r = roots[i];
        buffers[j++] = r.hash;
        buffers[j++] = c.encode(c.uint64, r.index);
        buffers[j++] = c.encode(c.uint64, r.size);
      }
      if (!out)
        out = b4a.allocUnsafe(32);
      sodium.crypto_generichash_batch(out, buffers);
      return out;
    };
    exports.randomBytes = function(n) {
      const buf = b4a.allocUnsafe(n);
      sodium.randombytes_buf(buf);
      return buf;
    };
    exports.discoveryKey = function(publicKey) {
      const digest = b4a.allocUnsafe(32);
      sodium.crypto_generichash(digest, HYPERCORE, publicKey);
      return digest;
    };
    if (sodium.sodium_free) {
      exports.free = function(secureBuf) {
        if (secureBuf.secure)
          sodium.sodium_free(secureBuf);
      };
    } else {
      exports.free = function() {
      };
    }
  }
});

// node_modules/xache/index.js
var require_xache = __commonJS({
  "node_modules/xache/index.js"(exports, module) {
    init_node_globals();
    module.exports = class MaxCache {
      constructor({ maxSize, maxAge }) {
        this.maxSize = maxSize;
        this.maxAge = maxAge;
        this._latest = /* @__PURE__ */ new Map();
        this._oldest = /* @__PURE__ */ new Map();
        this._gced = false;
        this._interval = null;
        if (this.maxAge > 0 && this.maxAge < Infinity) {
          const tick = Math.ceil(2 / 3 * this.maxAge);
          this._interval = setInterval(this._gcAuto.bind(this), tick);
          if (this._interval.unref)
            this._interval.unref();
        }
      }
      [Symbol.iterator]() {
        return new Iterator(this._latest[Symbol.iterator](), this._oldest[Symbol.iterator]());
      }
      keys() {
        return new Iterator(this._latest.keys(), this._oldest.keys());
      }
      values() {
        return new Iterator(this._latest.values(), this._oldest.values());
      }
      destroy() {
        this.clear();
        clearInterval(this._interval);
        this._interval = null;
      }
      clear() {
        this._gc();
        this._gc();
      }
      set(k, v) {
        this._latest.set(k, v);
        this._oldest.delete(k);
        if (this._latest.size >= this.maxSize)
          this._gc();
      }
      delete(k) {
        return this._latest.delete(k) || this._oldest.delete(k);
      }
      get(k) {
        let bump = false;
        let v = this._latest.get(k);
        if (!v) {
          v = this._oldest.get(k);
          if (!v)
            return null;
          bump = true;
        }
        if (bump) {
          this._latest.set(k, v);
          this._oldest.delete(k);
        }
        return v;
      }
      _gcAuto() {
        if (!this._gced)
          this._gc();
        this._gced = false;
      }
      _gc() {
        this._gced = true;
        this._oldest = this._latest;
        this._latest = /* @__PURE__ */ new Map();
      }
    };
    var Iterator = class {
      constructor(a, b) {
        this.a = a;
        this.b = b;
      }
      [Symbol.iterator]() {
        return this;
      }
      next() {
        if (this.a !== null) {
          const n = this.a.next();
          if (!n.done)
            return n;
          this.a = null;
        }
        return this.b.next();
      }
    };
  }
});

// node_modules/sodium-secretstream/index.js
var require_sodium_secretstream = __commonJS({
  "node_modules/sodium-secretstream/index.js"(exports, module) {
    init_node_globals();
    var sodium = require_sodium_universal();
    var b4a = require_browser2();
    var ABYTES = sodium.crypto_secretstream_xchacha20poly1305_ABYTES;
    var TAG_MESSAGE = sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE;
    var TAG_FINAL = sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL;
    var STATEBYTES = sodium.crypto_secretstream_xchacha20poly1305_STATEBYTES;
    var HEADERBYTES = sodium.crypto_secretstream_xchacha20poly1305_HEADERBYTES;
    var KEYBYTES = sodium.crypto_secretstream_xchacha20poly1305_KEYBYTES;
    var EMPTY = b4a.alloc(0);
    var TAG = b4a.alloc(1);
    var Push = class {
      constructor(key, state = b4a.allocUnsafe(STATEBYTES), header = b4a.allocUnsafe(HEADERBYTES)) {
        if (!TAG_FINAL)
          throw new Error("JavaScript sodium version needs to support crypto_secretstream_xchacha20poly");
        this.key = key;
        this.state = state;
        this.header = header;
        sodium.crypto_secretstream_xchacha20poly1305_init_push(this.state, this.header, this.key);
      }
      next(message, cipher = b4a.allocUnsafe(message.byteLength + ABYTES)) {
        sodium.crypto_secretstream_xchacha20poly1305_push(this.state, cipher, message, null, TAG_MESSAGE);
        return cipher;
      }
      final(message = EMPTY, cipher = b4a.allocUnsafe(ABYTES)) {
        sodium.crypto_secretstream_xchacha20poly1305_push(this.state, cipher, message, null, TAG_FINAL);
        return cipher;
      }
    };
    var Pull = class {
      constructor(key, state = b4a.allocUnsafe(STATEBYTES)) {
        if (!TAG_FINAL)
          throw new Error("JavaScript sodium version needs to support crypto_secretstream_xchacha20poly");
        this.key = key;
        this.state = state;
        this.final = false;
      }
      init(header) {
        sodium.crypto_secretstream_xchacha20poly1305_init_pull(this.state, header, this.key);
      }
      next(cipher, message = b4a.allocUnsafe(cipher.byteLength - ABYTES)) {
        sodium.crypto_secretstream_xchacha20poly1305_pull(this.state, message, TAG, cipher, null);
        this.final = b4a.equals(TAG, TAG_FINAL);
        return message;
      }
    };
    function keygen(buf = b4a.alloc(KEYBYTES)) {
      sodium.crypto_secretstream_xchacha20poly1305_keygen(buf);
      return buf;
    }
    module.exports = {
      keygen,
      KEYBYTES,
      ABYTES,
      STATEBYTES,
      HEADERBYTES,
      Push,
      Pull
    };
  }
});

// node_modules/queue-tick/queue-microtask.js
var require_queue_microtask = __commonJS({
  "node_modules/queue-tick/queue-microtask.js"(exports, module) {
    init_node_globals();
    module.exports = typeof queueMicrotask === "function" ? queueMicrotask : (fn) => Promise.resolve().then(fn);
  }
});

// node_modules/fast-fifo/fixed-size.js
var require_fixed_size = __commonJS({
  "node_modules/fast-fifo/fixed-size.js"(exports, module) {
    init_node_globals();
    module.exports = class FixedFIFO {
      constructor(hwm) {
        if (!(hwm > 0) || (hwm - 1 & hwm) !== 0)
          throw new Error("Max size for a FixedFIFO should be a power of two");
        this.buffer = new Array(hwm);
        this.mask = hwm - 1;
        this.top = 0;
        this.btm = 0;
        this.next = null;
      }
      push(data) {
        if (this.buffer[this.top] !== void 0)
          return false;
        this.buffer[this.top] = data;
        this.top = this.top + 1 & this.mask;
        return true;
      }
      shift() {
        const last = this.buffer[this.btm];
        if (last === void 0)
          return void 0;
        this.buffer[this.btm] = void 0;
        this.btm = this.btm + 1 & this.mask;
        return last;
      }
      peek() {
        return this.buffer[this.btm];
      }
      isEmpty() {
        return this.buffer[this.btm] === void 0;
      }
    };
  }
});

// node_modules/fast-fifo/index.js
var require_fast_fifo = __commonJS({
  "node_modules/fast-fifo/index.js"(exports, module) {
    init_node_globals();
    var FixedFIFO = require_fixed_size();
    module.exports = class FastFIFO {
      constructor(hwm) {
        this.hwm = hwm || 16;
        this.head = new FixedFIFO(this.hwm);
        this.tail = this.head;
      }
      push(val2) {
        if (!this.head.push(val2)) {
          const prev = this.head;
          this.head = prev.next = new FixedFIFO(2 * this.head.buffer.length);
          this.head.push(val2);
        }
      }
      shift() {
        const val2 = this.tail.shift();
        if (val2 === void 0 && this.tail.next) {
          const next = this.tail.next;
          this.tail.next = null;
          this.tail = next;
          return this.tail.shift();
        }
        return val2;
      }
      peek() {
        return this.tail.peek();
      }
      isEmpty() {
        return this.head.isEmpty();
      }
    };
  }
});

// node_modules/streamx/index.js
var require_streamx = __commonJS({
  "node_modules/streamx/index.js"(exports, module) {
    init_node_globals();
    var { EventEmitter } = require_events();
    var STREAM_DESTROYED = new Error("Stream was destroyed");
    var PREMATURE_CLOSE = new Error("Premature close");
    var queueTick = require_queue_microtask();
    var FIFO = require_fast_fifo();
    var MAX = (1 << 25) - 1;
    var OPENING = 1;
    var DESTROYING = 2;
    var DESTROYED = 4;
    var NOT_OPENING = MAX ^ OPENING;
    var READ_ACTIVE = 1 << 3;
    var READ_PRIMARY = 2 << 3;
    var READ_SYNC = 4 << 3;
    var READ_QUEUED = 8 << 3;
    var READ_RESUMED = 16 << 3;
    var READ_PIPE_DRAINED = 32 << 3;
    var READ_ENDING = 64 << 3;
    var READ_EMIT_DATA = 128 << 3;
    var READ_EMIT_READABLE = 256 << 3;
    var READ_EMITTED_READABLE = 512 << 3;
    var READ_DONE = 1024 << 3;
    var READ_NEXT_TICK = 2049 << 3;
    var READ_NEEDS_PUSH = 4096 << 3;
    var READ_NOT_ACTIVE = MAX ^ READ_ACTIVE;
    var READ_NON_PRIMARY = MAX ^ READ_PRIMARY;
    var READ_NON_PRIMARY_AND_PUSHED = MAX ^ (READ_PRIMARY | READ_NEEDS_PUSH);
    var READ_NOT_SYNC = MAX ^ READ_SYNC;
    var READ_PUSHED = MAX ^ READ_NEEDS_PUSH;
    var READ_PAUSED = MAX ^ READ_RESUMED;
    var READ_NOT_QUEUED = MAX ^ (READ_QUEUED | READ_EMITTED_READABLE);
    var READ_NOT_ENDING = MAX ^ READ_ENDING;
    var READ_PIPE_NOT_DRAINED = MAX ^ (READ_RESUMED | READ_PIPE_DRAINED);
    var READ_NOT_NEXT_TICK = MAX ^ READ_NEXT_TICK;
    var WRITE_ACTIVE = 1 << 16;
    var WRITE_PRIMARY = 2 << 16;
    var WRITE_SYNC = 4 << 16;
    var WRITE_QUEUED = 8 << 16;
    var WRITE_UNDRAINED = 16 << 16;
    var WRITE_DONE = 32 << 16;
    var WRITE_EMIT_DRAIN = 64 << 16;
    var WRITE_NEXT_TICK = 129 << 16;
    var WRITE_FINISHING = 256 << 16;
    var WRITE_NOT_ACTIVE = MAX ^ WRITE_ACTIVE;
    var WRITE_NOT_SYNC = MAX ^ WRITE_SYNC;
    var WRITE_NON_PRIMARY = MAX ^ WRITE_PRIMARY;
    var WRITE_NOT_FINISHING = MAX ^ WRITE_FINISHING;
    var WRITE_DRAINED = MAX ^ WRITE_UNDRAINED;
    var WRITE_NOT_QUEUED = MAX ^ WRITE_QUEUED;
    var WRITE_NOT_NEXT_TICK = MAX ^ WRITE_NEXT_TICK;
    var ACTIVE = READ_ACTIVE | WRITE_ACTIVE;
    var NOT_ACTIVE = MAX ^ ACTIVE;
    var DONE = READ_DONE | WRITE_DONE;
    var DESTROY_STATUS = DESTROYING | DESTROYED;
    var OPEN_STATUS = DESTROY_STATUS | OPENING;
    var AUTO_DESTROY = DESTROY_STATUS | DONE;
    var NON_PRIMARY = WRITE_NON_PRIMARY & READ_NON_PRIMARY;
    var TICKING = (WRITE_NEXT_TICK | READ_NEXT_TICK) & NOT_ACTIVE;
    var ACTIVE_OR_TICKING = ACTIVE | TICKING;
    var IS_OPENING = OPEN_STATUS | TICKING;
    var READ_PRIMARY_STATUS = OPEN_STATUS | READ_ENDING | READ_DONE;
    var READ_STATUS = OPEN_STATUS | READ_DONE | READ_QUEUED;
    var READ_FLOWING = READ_RESUMED | READ_PIPE_DRAINED;
    var READ_ACTIVE_AND_SYNC = READ_ACTIVE | READ_SYNC;
    var READ_ACTIVE_AND_SYNC_AND_NEEDS_PUSH = READ_ACTIVE | READ_SYNC | READ_NEEDS_PUSH;
    var READ_PRIMARY_AND_ACTIVE = READ_PRIMARY | READ_ACTIVE;
    var READ_ENDING_STATUS = OPEN_STATUS | READ_ENDING | READ_QUEUED;
    var READ_EMIT_READABLE_AND_QUEUED = READ_EMIT_READABLE | READ_QUEUED;
    var READ_READABLE_STATUS = OPEN_STATUS | READ_EMIT_READABLE | READ_QUEUED | READ_EMITTED_READABLE;
    var SHOULD_NOT_READ = OPEN_STATUS | READ_ACTIVE | READ_ENDING | READ_DONE | READ_NEEDS_PUSH;
    var READ_BACKPRESSURE_STATUS = DESTROY_STATUS | READ_ENDING | READ_DONE;
    var WRITE_PRIMARY_STATUS = OPEN_STATUS | WRITE_FINISHING | WRITE_DONE;
    var WRITE_QUEUED_AND_UNDRAINED = WRITE_QUEUED | WRITE_UNDRAINED;
    var WRITE_QUEUED_AND_ACTIVE = WRITE_QUEUED | WRITE_ACTIVE;
    var WRITE_DRAIN_STATUS = WRITE_QUEUED | WRITE_UNDRAINED | OPEN_STATUS | WRITE_ACTIVE;
    var WRITE_STATUS = OPEN_STATUS | WRITE_ACTIVE | WRITE_QUEUED;
    var WRITE_PRIMARY_AND_ACTIVE = WRITE_PRIMARY | WRITE_ACTIVE;
    var WRITE_ACTIVE_AND_SYNC = WRITE_ACTIVE | WRITE_SYNC;
    var WRITE_FINISHING_STATUS = OPEN_STATUS | WRITE_FINISHING | WRITE_QUEUED_AND_ACTIVE | WRITE_DONE;
    var WRITE_BACKPRESSURE_STATUS = WRITE_UNDRAINED | DESTROY_STATUS | WRITE_FINISHING | WRITE_DONE;
    var asyncIterator = Symbol.asyncIterator || Symbol("asyncIterator");
    var WritableState = class {
      constructor(stream, { highWaterMark = 16384, map = null, mapWritable, byteLength, byteLengthWritable } = {}) {
        this.stream = stream;
        this.queue = new FIFO();
        this.highWaterMark = highWaterMark;
        this.buffered = 0;
        this.error = null;
        this.pipeline = null;
        this.byteLength = byteLengthWritable || byteLength || defaultByteLength;
        this.map = mapWritable || map;
        this.afterWrite = afterWrite.bind(this);
        this.afterUpdateNextTick = updateWriteNT.bind(this);
      }
      get ended() {
        return (this.stream._duplexState & WRITE_DONE) !== 0;
      }
      push(data) {
        if (this.map !== null)
          data = this.map(data);
        this.buffered += this.byteLength(data);
        this.queue.push(data);
        if (this.buffered < this.highWaterMark) {
          this.stream._duplexState |= WRITE_QUEUED;
          return true;
        }
        this.stream._duplexState |= WRITE_QUEUED_AND_UNDRAINED;
        return false;
      }
      shift() {
        const data = this.queue.shift();
        const stream = this.stream;
        this.buffered -= this.byteLength(data);
        if (this.buffered === 0)
          stream._duplexState &= WRITE_NOT_QUEUED;
        return data;
      }
      end(data) {
        if (typeof data === "function")
          this.stream.once("finish", data);
        else if (data !== void 0 && data !== null)
          this.push(data);
        this.stream._duplexState = (this.stream._duplexState | WRITE_FINISHING) & WRITE_NON_PRIMARY;
      }
      autoBatch(data, cb) {
        const buffer = [];
        const stream = this.stream;
        buffer.push(data);
        while ((stream._duplexState & WRITE_STATUS) === WRITE_QUEUED_AND_ACTIVE) {
          buffer.push(stream._writableState.shift());
        }
        if ((stream._duplexState & OPEN_STATUS) !== 0)
          return cb(null);
        stream._writev(buffer, cb);
      }
      update() {
        const stream = this.stream;
        while ((stream._duplexState & WRITE_STATUS) === WRITE_QUEUED) {
          const data = this.shift();
          stream._duplexState |= WRITE_ACTIVE_AND_SYNC;
          stream._write(data, this.afterWrite);
          stream._duplexState &= WRITE_NOT_SYNC;
        }
        if ((stream._duplexState & WRITE_PRIMARY_AND_ACTIVE) === 0)
          this.updateNonPrimary();
      }
      updateNonPrimary() {
        const stream = this.stream;
        if ((stream._duplexState & WRITE_FINISHING_STATUS) === WRITE_FINISHING) {
          stream._duplexState = (stream._duplexState | WRITE_ACTIVE) & WRITE_NOT_FINISHING;
          stream._final(afterFinal.bind(this));
          return;
        }
        if ((stream._duplexState & DESTROY_STATUS) === DESTROYING) {
          if ((stream._duplexState & ACTIVE_OR_TICKING) === 0) {
            stream._duplexState |= ACTIVE;
            stream._destroy(afterDestroy.bind(this));
          }
          return;
        }
        if ((stream._duplexState & IS_OPENING) === OPENING) {
          stream._duplexState = (stream._duplexState | ACTIVE) & NOT_OPENING;
          stream._open(afterOpen.bind(this));
        }
      }
      updateNextTick() {
        if ((this.stream._duplexState & WRITE_NEXT_TICK) !== 0)
          return;
        this.stream._duplexState |= WRITE_NEXT_TICK;
        queueTick(this.afterUpdateNextTick);
      }
    };
    var ReadableState = class {
      constructor(stream, { highWaterMark = 16384, map = null, mapReadable, byteLength, byteLengthReadable } = {}) {
        this.stream = stream;
        this.queue = new FIFO();
        this.highWaterMark = highWaterMark;
        this.buffered = 0;
        this.error = null;
        this.pipeline = null;
        this.byteLength = byteLengthReadable || byteLength || defaultByteLength;
        this.map = mapReadable || map;
        this.pipeTo = null;
        this.afterRead = afterRead.bind(this);
        this.afterUpdateNextTick = updateReadNT.bind(this);
      }
      get ended() {
        return (this.stream._duplexState & READ_DONE) !== 0;
      }
      pipe(pipeTo, cb) {
        if (this.pipeTo !== null)
          throw new Error("Can only pipe to one destination");
        this.stream._duplexState |= READ_PIPE_DRAINED;
        this.pipeTo = pipeTo;
        this.pipeline = new Pipeline(this.stream, pipeTo, cb || null);
        if (cb)
          this.stream.on("error", noop);
        if (isStreamx(pipeTo)) {
          pipeTo._writableState.pipeline = this.pipeline;
          if (cb)
            pipeTo.on("error", noop);
          pipeTo.on("finish", this.pipeline.finished.bind(this.pipeline));
        } else {
          const onerror = this.pipeline.done.bind(this.pipeline, pipeTo);
          const onclose = this.pipeline.done.bind(this.pipeline, pipeTo, null);
          pipeTo.on("error", onerror);
          pipeTo.on("close", onclose);
          pipeTo.on("finish", this.pipeline.finished.bind(this.pipeline));
        }
        pipeTo.on("drain", afterDrain.bind(this));
        this.stream.emit("piping", pipeTo);
        pipeTo.emit("pipe", this.stream);
      }
      push(data) {
        const stream = this.stream;
        if (data === null) {
          this.highWaterMark = 0;
          stream._duplexState = (stream._duplexState | READ_ENDING) & READ_NON_PRIMARY_AND_PUSHED;
          return false;
        }
        if (this.map !== null)
          data = this.map(data);
        this.buffered += this.byteLength(data);
        this.queue.push(data);
        stream._duplexState = (stream._duplexState | READ_QUEUED) & READ_PUSHED;
        return this.buffered < this.highWaterMark;
      }
      shift() {
        const data = this.queue.shift();
        this.buffered -= this.byteLength(data);
        if (this.buffered === 0)
          this.stream._duplexState &= READ_NOT_QUEUED;
        return data;
      }
      unshift(data) {
        let tail;
        const pending = [];
        while ((tail = this.queue.shift()) !== void 0) {
          pending.push(tail);
        }
        this.push(data);
        for (let i = 0; i < pending.length; i++) {
          this.queue.push(pending[i]);
        }
      }
      read() {
        const stream = this.stream;
        if ((stream._duplexState & READ_STATUS) === READ_QUEUED) {
          const data = this.shift();
          if (this.pipeTo !== null && this.pipeTo.write(data) === false)
            stream._duplexState &= READ_PIPE_NOT_DRAINED;
          if ((stream._duplexState & READ_EMIT_DATA) !== 0)
            stream.emit("data", data);
          return data;
        }
        return null;
      }
      drain() {
        const stream = this.stream;
        while ((stream._duplexState & READ_STATUS) === READ_QUEUED && (stream._duplexState & READ_FLOWING) !== 0) {
          const data = this.shift();
          if (this.pipeTo !== null && this.pipeTo.write(data) === false)
            stream._duplexState &= READ_PIPE_NOT_DRAINED;
          if ((stream._duplexState & READ_EMIT_DATA) !== 0)
            stream.emit("data", data);
        }
      }
      update() {
        const stream = this.stream;
        this.drain();
        while (this.buffered < this.highWaterMark && (stream._duplexState & SHOULD_NOT_READ) === 0) {
          stream._duplexState |= READ_ACTIVE_AND_SYNC_AND_NEEDS_PUSH;
          stream._read(this.afterRead);
          stream._duplexState &= READ_NOT_SYNC;
          if ((stream._duplexState & READ_ACTIVE) === 0)
            this.drain();
        }
        if ((stream._duplexState & READ_READABLE_STATUS) === READ_EMIT_READABLE_AND_QUEUED) {
          stream._duplexState |= READ_EMITTED_READABLE;
          stream.emit("readable");
        }
        if ((stream._duplexState & READ_PRIMARY_AND_ACTIVE) === 0)
          this.updateNonPrimary();
      }
      updateNonPrimary() {
        const stream = this.stream;
        if ((stream._duplexState & READ_ENDING_STATUS) === READ_ENDING) {
          stream._duplexState = (stream._duplexState | READ_DONE) & READ_NOT_ENDING;
          stream.emit("end");
          if ((stream._duplexState & AUTO_DESTROY) === DONE)
            stream._duplexState |= DESTROYING;
          if (this.pipeTo !== null)
            this.pipeTo.end();
        }
        if ((stream._duplexState & DESTROY_STATUS) === DESTROYING) {
          if ((stream._duplexState & ACTIVE_OR_TICKING) === 0) {
            stream._duplexState |= ACTIVE;
            stream._destroy(afterDestroy.bind(this));
          }
          return;
        }
        if ((stream._duplexState & IS_OPENING) === OPENING) {
          stream._duplexState = (stream._duplexState | ACTIVE) & NOT_OPENING;
          stream._open(afterOpen.bind(this));
        }
      }
      updateNextTick() {
        if ((this.stream._duplexState & READ_NEXT_TICK) !== 0)
          return;
        this.stream._duplexState |= READ_NEXT_TICK;
        queueTick(this.afterUpdateNextTick);
      }
    };
    var TransformState = class {
      constructor(stream) {
        this.data = null;
        this.afterTransform = afterTransform.bind(stream);
        this.afterFinal = null;
      }
    };
    var Pipeline = class {
      constructor(src, dst, cb) {
        this.from = src;
        this.to = dst;
        this.afterPipe = cb;
        this.error = null;
        this.pipeToFinished = false;
      }
      finished() {
        this.pipeToFinished = true;
      }
      done(stream, err) {
        if (err)
          this.error = err;
        if (stream === this.to) {
          this.to = null;
          if (this.from !== null) {
            if ((this.from._duplexState & READ_DONE) === 0 || !this.pipeToFinished) {
              this.from.destroy(this.error || new Error("Writable stream closed prematurely"));
            }
            return;
          }
        }
        if (stream === this.from) {
          this.from = null;
          if (this.to !== null) {
            if ((stream._duplexState & READ_DONE) === 0) {
              this.to.destroy(this.error || new Error("Readable stream closed before ending"));
            }
            return;
          }
        }
        if (this.afterPipe !== null)
          this.afterPipe(this.error);
        this.to = this.from = this.afterPipe = null;
      }
    };
    function afterDrain() {
      this.stream._duplexState |= READ_PIPE_DRAINED;
      if ((this.stream._duplexState & READ_ACTIVE_AND_SYNC) === 0)
        this.updateNextTick();
    }
    function afterFinal(err) {
      const stream = this.stream;
      if (err)
        stream.destroy(err);
      if ((stream._duplexState & DESTROY_STATUS) === 0) {
        stream._duplexState |= WRITE_DONE;
        stream.emit("finish");
      }
      if ((stream._duplexState & AUTO_DESTROY) === DONE) {
        stream._duplexState |= DESTROYING;
      }
      stream._duplexState &= WRITE_NOT_ACTIVE;
      this.update();
    }
    function afterDestroy(err) {
      const stream = this.stream;
      if (!err && this.error !== STREAM_DESTROYED)
        err = this.error;
      if (err)
        stream.emit("error", err);
      stream._duplexState |= DESTROYED;
      stream.emit("close");
      const rs = stream._readableState;
      const ws = stream._writableState;
      if (rs !== null && rs.pipeline !== null)
        rs.pipeline.done(stream, err);
      if (ws !== null && ws.pipeline !== null)
        ws.pipeline.done(stream, err);
    }
    function afterWrite(err) {
      const stream = this.stream;
      if (err)
        stream.destroy(err);
      stream._duplexState &= WRITE_NOT_ACTIVE;
      if ((stream._duplexState & WRITE_DRAIN_STATUS) === WRITE_UNDRAINED) {
        stream._duplexState &= WRITE_DRAINED;
        if ((stream._duplexState & WRITE_EMIT_DRAIN) === WRITE_EMIT_DRAIN) {
          stream.emit("drain");
        }
      }
      if ((stream._duplexState & WRITE_SYNC) === 0)
        this.update();
    }
    function afterRead(err) {
      if (err)
        this.stream.destroy(err);
      this.stream._duplexState &= READ_NOT_ACTIVE;
      if ((this.stream._duplexState & READ_SYNC) === 0)
        this.update();
    }
    function updateReadNT() {
      this.stream._duplexState &= READ_NOT_NEXT_TICK;
      this.update();
    }
    function updateWriteNT() {
      this.stream._duplexState &= WRITE_NOT_NEXT_TICK;
      this.update();
    }
    function afterOpen(err) {
      const stream = this.stream;
      if (err)
        stream.destroy(err);
      if ((stream._duplexState & DESTROYING) === 0) {
        if ((stream._duplexState & READ_PRIMARY_STATUS) === 0)
          stream._duplexState |= READ_PRIMARY;
        if ((stream._duplexState & WRITE_PRIMARY_STATUS) === 0)
          stream._duplexState |= WRITE_PRIMARY;
        stream.emit("open");
      }
      stream._duplexState &= NOT_ACTIVE;
      if (stream._writableState !== null) {
        stream._writableState.update();
      }
      if (stream._readableState !== null) {
        stream._readableState.update();
      }
    }
    function afterTransform(err, data) {
      if (data !== void 0 && data !== null)
        this.push(data);
      this._writableState.afterWrite(err);
    }
    var Stream = class extends EventEmitter {
      constructor(opts) {
        super();
        this._duplexState = 0;
        this._readableState = null;
        this._writableState = null;
        if (opts) {
          if (opts.open)
            this._open = opts.open;
          if (opts.destroy)
            this._destroy = opts.destroy;
          if (opts.predestroy)
            this._predestroy = opts.predestroy;
          if (opts.signal) {
            opts.signal.addEventListener("abort", abort.bind(this));
          }
        }
      }
      _open(cb) {
        cb(null);
      }
      _destroy(cb) {
        cb(null);
      }
      _predestroy() {
      }
      get readable() {
        return this._readableState !== null ? true : void 0;
      }
      get writable() {
        return this._writableState !== null ? true : void 0;
      }
      get destroyed() {
        return (this._duplexState & DESTROYED) !== 0;
      }
      get destroying() {
        return (this._duplexState & DESTROY_STATUS) !== 0;
      }
      destroy(err) {
        if ((this._duplexState & DESTROY_STATUS) === 0) {
          if (!err)
            err = STREAM_DESTROYED;
          this._duplexState = (this._duplexState | DESTROYING) & NON_PRIMARY;
          if (this._readableState !== null) {
            this._readableState.error = err;
            this._readableState.updateNextTick();
          }
          if (this._writableState !== null) {
            this._writableState.error = err;
            this._writableState.updateNextTick();
          }
          this._predestroy();
        }
      }
      on(name, fn) {
        if (this._readableState !== null) {
          if (name === "data") {
            this._duplexState |= READ_EMIT_DATA | READ_RESUMED;
            this._readableState.updateNextTick();
          }
          if (name === "readable") {
            this._duplexState |= READ_EMIT_READABLE;
            this._readableState.updateNextTick();
          }
        }
        if (this._writableState !== null) {
          if (name === "drain") {
            this._duplexState |= WRITE_EMIT_DRAIN;
            this._writableState.updateNextTick();
          }
        }
        return super.on(name, fn);
      }
    };
    var Readable = class extends Stream {
      constructor(opts) {
        super(opts);
        this._duplexState |= OPENING | WRITE_DONE;
        this._readableState = new ReadableState(this, opts);
        if (opts) {
          if (opts.read)
            this._read = opts.read;
          if (opts.eagerOpen)
            this.resume().pause();
        }
      }
      _read(cb) {
        cb(null);
      }
      pipe(dest, cb) {
        this._readableState.pipe(dest, cb);
        this._readableState.updateNextTick();
        return dest;
      }
      read() {
        this._readableState.updateNextTick();
        return this._readableState.read();
      }
      push(data) {
        this._readableState.updateNextTick();
        return this._readableState.push(data);
      }
      unshift(data) {
        this._readableState.updateNextTick();
        return this._readableState.unshift(data);
      }
      resume() {
        this._duplexState |= READ_RESUMED;
        this._readableState.updateNextTick();
        return this;
      }
      pause() {
        this._duplexState &= READ_PAUSED;
        return this;
      }
      static _fromAsyncIterator(ite, opts) {
        let destroy;
        const rs = new Readable({
          ...opts,
          read(cb) {
            ite.next().then(push).then(cb.bind(null, null)).catch(cb);
          },
          predestroy() {
            destroy = ite.return();
          },
          destroy(cb) {
            destroy.then(cb.bind(null, null)).catch(cb);
          }
        });
        return rs;
        function push(data) {
          if (data.done)
            rs.push(null);
          else
            rs.push(data.value);
        }
      }
      static from(data, opts) {
        if (isReadStreamx(data))
          return data;
        if (data[asyncIterator])
          return this._fromAsyncIterator(data[asyncIterator](), opts);
        if (!Array.isArray(data))
          data = data === void 0 ? [] : [data];
        let i = 0;
        return new Readable({
          ...opts,
          read(cb) {
            this.push(i === data.length ? null : data[i++]);
            cb(null);
          }
        });
      }
      static isBackpressured(rs) {
        return (rs._duplexState & READ_BACKPRESSURE_STATUS) !== 0 || rs._readableState.buffered >= rs._readableState.highWaterMark;
      }
      static isPaused(rs) {
        return (rs._duplexState & READ_RESUMED) === 0;
      }
      [asyncIterator]() {
        const stream = this;
        let error = null;
        let promiseResolve = null;
        let promiseReject = null;
        this.on("error", (err) => {
          error = err;
        });
        this.on("readable", onreadable);
        this.on("close", onclose);
        return {
          [asyncIterator]() {
            return this;
          },
          next() {
            return new Promise(function(resolve, reject) {
              promiseResolve = resolve;
              promiseReject = reject;
              const data = stream.read();
              if (data !== null)
                ondata(data);
              else if ((stream._duplexState & DESTROYED) !== 0)
                ondata(null);
            });
          },
          return() {
            return destroy(null);
          },
          throw(err) {
            return destroy(err);
          }
        };
        function onreadable() {
          if (promiseResolve !== null)
            ondata(stream.read());
        }
        function onclose() {
          if (promiseResolve !== null)
            ondata(null);
        }
        function ondata(data) {
          if (promiseReject === null)
            return;
          if (error)
            promiseReject(error);
          else if (data === null && (stream._duplexState & READ_DONE) === 0)
            promiseReject(STREAM_DESTROYED);
          else
            promiseResolve({ value: data, done: data === null });
          promiseReject = promiseResolve = null;
        }
        function destroy(err) {
          stream.destroy(err);
          return new Promise((resolve, reject) => {
            if (stream._duplexState & DESTROYED)
              return resolve({ value: void 0, done: true });
            stream.once("close", function() {
              if (err)
                reject(err);
              else
                resolve({ value: void 0, done: true });
            });
          });
        }
      }
    };
    var Writable = class extends Stream {
      constructor(opts) {
        super(opts);
        this._duplexState |= OPENING | READ_DONE;
        this._writableState = new WritableState(this, opts);
        if (opts) {
          if (opts.writev)
            this._writev = opts.writev;
          if (opts.write)
            this._write = opts.write;
          if (opts.final)
            this._final = opts.final;
        }
      }
      _writev(batch, cb) {
        cb(null);
      }
      _write(data, cb) {
        this._writableState.autoBatch(data, cb);
      }
      _final(cb) {
        cb(null);
      }
      static isBackpressured(ws) {
        return (ws._duplexState & WRITE_BACKPRESSURE_STATUS) !== 0;
      }
      write(data) {
        this._writableState.updateNextTick();
        return this._writableState.push(data);
      }
      end(data) {
        this._writableState.updateNextTick();
        this._writableState.end(data);
        return this;
      }
    };
    var Duplex = class extends Readable {
      constructor(opts) {
        super(opts);
        this._duplexState = OPENING;
        this._writableState = new WritableState(this, opts);
        if (opts) {
          if (opts.writev)
            this._writev = opts.writev;
          if (opts.write)
            this._write = opts.write;
          if (opts.final)
            this._final = opts.final;
        }
      }
      _writev(batch, cb) {
        cb(null);
      }
      _write(data, cb) {
        this._writableState.autoBatch(data, cb);
      }
      _final(cb) {
        cb(null);
      }
      write(data) {
        this._writableState.updateNextTick();
        return this._writableState.push(data);
      }
      end(data) {
        this._writableState.updateNextTick();
        this._writableState.end(data);
        return this;
      }
    };
    var Transform = class extends Duplex {
      constructor(opts) {
        super(opts);
        this._transformState = new TransformState(this);
        if (opts) {
          if (opts.transform)
            this._transform = opts.transform;
          if (opts.flush)
            this._flush = opts.flush;
        }
      }
      _write(data, cb) {
        if (this._readableState.buffered >= this._readableState.highWaterMark) {
          this._transformState.data = data;
        } else {
          this._transform(data, this._transformState.afterTransform);
        }
      }
      _read(cb) {
        if (this._transformState.data !== null) {
          const data = this._transformState.data;
          this._transformState.data = null;
          cb(null);
          this._transform(data, this._transformState.afterTransform);
        } else {
          cb(null);
        }
      }
      _transform(data, cb) {
        cb(null, data);
      }
      _flush(cb) {
        cb(null);
      }
      _final(cb) {
        this._transformState.afterFinal = cb;
        this._flush(transformAfterFlush.bind(this));
      }
    };
    var PassThrough = class extends Transform {
    };
    function transformAfterFlush(err, data) {
      const cb = this._transformState.afterFinal;
      if (err)
        return cb(err);
      if (data !== null && data !== void 0)
        this.push(data);
      this.push(null);
      cb(null);
    }
    function pipelinePromise(...streams) {
      return new Promise((resolve, reject) => {
        return pipeline(...streams, (err) => {
          if (err)
            return reject(err);
          resolve();
        });
      });
    }
    function pipeline(stream, ...streams) {
      const all = Array.isArray(stream) ? [...stream, ...streams] : [stream, ...streams];
      const done = all.length && typeof all[all.length - 1] === "function" ? all.pop() : null;
      if (all.length < 2)
        throw new Error("Pipeline requires at least 2 streams");
      let src = all[0];
      let dest = null;
      let error = null;
      for (let i = 1; i < all.length; i++) {
        dest = all[i];
        if (isStreamx(src)) {
          src.pipe(dest, onerror);
        } else {
          errorHandle(src, true, i > 1, onerror);
          src.pipe(dest);
        }
        src = dest;
      }
      if (done) {
        let fin = false;
        dest.on("finish", () => {
          fin = true;
        });
        dest.on("error", (err) => {
          error = error || err;
        });
        dest.on("close", () => done(error || (fin ? null : PREMATURE_CLOSE)));
      }
      return dest;
      function errorHandle(s, rd, wr, onerror2) {
        s.on("error", onerror2);
        s.on("close", onclose);
        function onclose() {
          if (rd && s._readableState && !s._readableState.ended)
            return onerror2(PREMATURE_CLOSE);
          if (wr && s._writableState && !s._writableState.ended)
            return onerror2(PREMATURE_CLOSE);
        }
      }
      function onerror(err) {
        if (!err || error)
          return;
        error = err;
        for (const s of all) {
          s.destroy(err);
        }
      }
    }
    function isStream(stream) {
      return !!stream._readableState || !!stream._writableState;
    }
    function isStreamx(stream) {
      return typeof stream._duplexState === "number" && isStream(stream);
    }
    function isReadStreamx(stream) {
      return isStreamx(stream) && stream.readable;
    }
    function isTypedArray(data) {
      return typeof data === "object" && data !== null && typeof data.byteLength === "number";
    }
    function defaultByteLength(data) {
      return isTypedArray(data) ? data.byteLength : 1024;
    }
    function noop() {
    }
    function abort() {
      this.destroy(new Error("Stream aborted."));
    }
    module.exports = {
      pipeline,
      pipelinePromise,
      isStream,
      isStreamx,
      Stream,
      Writable,
      Readable,
      Duplex,
      Transform,
      PassThrough
    };
  }
});

// node_modules/@hyperswarm/secret-stream/lib/bridge.js
var require_bridge = __commonJS({
  "node_modules/@hyperswarm/secret-stream/lib/bridge.js"(exports, module) {
    init_node_globals();
    var { Duplex } = require_streamx();
    var ReversePassThrough = class extends Duplex {
      constructor(s) {
        super();
        this._stream = s;
        this._ondrain = null;
      }
      _write(data, cb) {
        if (this._stream.push(data) === false) {
          this._stream._ondrain = cb;
        } else {
          cb(null);
        }
      }
      _final(cb) {
        this._stream.push(null);
        cb(null);
      }
      _read(cb) {
        const ondrain = this._ondrain;
        this._ondrain = null;
        if (ondrain)
          ondrain();
        cb(null);
      }
    };
    module.exports = class Bridge extends Duplex {
      constructor(noiseStream) {
        super();
        this.noiseStream = noiseStream;
        this._ondrain = null;
        this.reverse = new ReversePassThrough(this);
      }
      get publicKey() {
        return this.noiseStream.publicKey;
      }
      get remotePublicKey() {
        return this.noiseStream.remotePublicKey;
      }
      get handshakeHash() {
        return this.noiseStream.handshakeHash;
      }
      _read(cb) {
        const ondrain = this._ondrain;
        this._ondrain = null;
        if (ondrain)
          ondrain();
        cb(null);
      }
      _write(data, cb) {
        if (this.reverse.push(data) === false) {
          this.reverse._ondrain = cb;
        } else {
          cb(null);
        }
      }
      _final(cb) {
        this.reverse.push(null);
        cb(null);
      }
    };
  }
});

// node_modules/noise-curve-ed/index.js
var require_noise_curve_ed = __commonJS({
  "node_modules/noise-curve-ed/index.js"(exports, module) {
    init_node_globals();
    var sodium = require_sodium_universal();
    var assert = require_nanoassert();
    var b4a = require_browser2();
    var DHLEN = sodium.crypto_scalarmult_ed25519_BYTES;
    var PKLEN = sodium.crypto_scalarmult_ed25519_BYTES;
    var SKLEN = sodium.crypto_sign_SECRETKEYBYTES;
    var ALG = "Ed25519";
    module.exports = {
      DHLEN,
      PKLEN,
      SKLEN,
      ALG,
      name: ALG,
      generateKeyPair,
      dh
    };
    function generateKeyPair(privKey) {
      if (privKey)
        return generateSeedKeyPair(privKey.subarray(0, 32));
      const keyPair = {};
      keyPair.secretKey = b4a.alloc(SKLEN);
      keyPair.publicKey = b4a.alloc(PKLEN);
      sodium.crypto_sign_keypair(keyPair.publicKey, keyPair.secretKey);
      return keyPair;
    }
    function generateSeedKeyPair(seed) {
      const keyPair = {};
      keyPair.secretKey = b4a.alloc(SKLEN);
      keyPair.publicKey = b4a.alloc(PKLEN);
      sodium.crypto_sign_seed_keypair(keyPair.publicKey, keyPair.secretKey, seed);
      return keyPair;
    }
    function dh(pk, lsk) {
      assert(lsk.byteLength === SKLEN);
      assert(pk.byteLength === PKLEN);
      const output = b4a.alloc(DHLEN);
      const sk = b4a.alloc(64);
      sodium.crypto_hash_sha512(sk, lsk.subarray(0, 32));
      sk[0] &= 248;
      sk[31] &= 127;
      sk[31] |= 64;
      sodium.crypto_scalarmult_ed25519(output, sk.subarray(0, 32), pk);
      return output;
    }
  }
});

// node_modules/noise-handshake/cipher.js
var require_cipher = __commonJS({
  "node_modules/noise-handshake/cipher.js"(exports, module) {
    init_node_globals();
    var sodium = require_sodium_universal();
    var b4a = require_browser2();
    module.exports = class CipherState {
      constructor(key) {
        this.key = key || null;
        this.nonce = 0;
        this.CIPHER_ALG = "ChaChaPoly";
      }
      initialiseKey(key) {
        this.key = key;
        this.nonce = 0;
      }
      setNonce(nonce) {
        this.nonce = nonce;
      }
      encrypt(plaintext, ad) {
        if (!this.hasKey)
          return plaintext;
        if (!ad)
          ad = b4a.alloc(0);
        const ciphertext = encryptWithAD(this.key, this.nonce, ad, plaintext);
        this.nonce++;
        return ciphertext;
      }
      decrypt(ciphertext, ad) {
        if (!this.hasKey)
          return ciphertext;
        if (!ad)
          ad = b4a.alloc(0);
        const plaintext = decryptWithAD(this.key, this.nonce, ad, ciphertext);
        this.nonce++;
        return plaintext;
      }
      get hasKey() {
        return this.key !== null;
      }
      _clear() {
        sodium.sodium_memzero(this.key);
        this.key = null;
        this.nonce = null;
      }
      static get MACBYTES() {
        return 16;
      }
      static get NONCEBYTES() {
        return 8;
      }
      static get KEYBYTES() {
        return 32;
      }
    };
    function encryptWithAD(key, counter, additionalData, plaintext) {
      if (!b4a.isBuffer(additionalData))
        additionalData = b4a.from(additionalData, "hex");
      if (!b4a.isBuffer(plaintext))
        plaintext = b4a.from(plaintext, "hex");
      const nonce = b4a.alloc(sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
      const view = new DataView(nonce.buffer, nonce.byteOffset, nonce.byteLength);
      view.setUint32(4, counter, true);
      const ciphertext = b4a.alloc(plaintext.byteLength + sodium.crypto_aead_chacha20poly1305_ietf_ABYTES);
      sodium.crypto_aead_chacha20poly1305_ietf_encrypt(ciphertext, plaintext, additionalData, null, nonce, key);
      return ciphertext;
    }
    function decryptWithAD(key, counter, additionalData, ciphertext) {
      if (!b4a.isBuffer(additionalData))
        additionalData = b4a.from(additionalData, "hex");
      if (!b4a.isBuffer(ciphertext))
        ciphertext = b4a.from(ciphertext, "hex");
      const nonce = b4a.alloc(sodium.crypto_aead_chacha20poly1305_ietf_NPUBBYTES);
      const view = new DataView(nonce.buffer, nonce.byteOffset, nonce.byteLength);
      view.setUint32(4, counter, true);
      const plaintext = b4a.alloc(ciphertext.byteLength - sodium.crypto_aead_chacha20poly1305_ietf_ABYTES);
      sodium.crypto_aead_chacha20poly1305_ietf_decrypt(plaintext, null, ciphertext, additionalData, nonce, key);
      return plaintext;
    }
  }
});

// node_modules/sodium-universal/crypto_kx.js
var require_crypto_kx2 = __commonJS({
  "node_modules/sodium-universal/crypto_kx.js"(exports, module) {
    init_node_globals();
    module.exports = require_sodium_javascript();
  }
});

// node_modules/sodium-universal/crypto_scalarmult.js
var require_crypto_scalarmult2 = __commonJS({
  "node_modules/sodium-universal/crypto_scalarmult.js"(exports, module) {
    init_node_globals();
    module.exports = require_sodium_javascript();
  }
});

// node_modules/noise-handshake/dh.js
var require_dh = __commonJS({
  "node_modules/noise-handshake/dh.js"(exports, module) {
    init_node_globals();
    var { crypto_kx_SEEDBYTES, crypto_kx_keypair, crypto_kx_seed_keypair } = require_crypto_kx2();
    var { crypto_scalarmult_BYTES, crypto_scalarmult_SCALARBYTES, crypto_scalarmult, crypto_scalarmult_base } = require_crypto_scalarmult2();
    var assert = require_nanoassert();
    var b4a = require_browser2();
    var DHLEN = crypto_scalarmult_BYTES;
    var PKLEN = crypto_scalarmult_BYTES;
    var SKLEN = crypto_scalarmult_SCALARBYTES;
    var SEEDLEN = crypto_kx_SEEDBYTES;
    var ALG = "25519";
    module.exports = {
      DHLEN,
      PKLEN,
      SKLEN,
      SEEDLEN,
      ALG,
      generateKeyPair,
      generateSeedKeyPair,
      dh
    };
    function generateKeyPair(privKey) {
      const keyPair = {};
      keyPair.secretKey = privKey || b4a.alloc(SKLEN);
      keyPair.publicKey = b4a.alloc(PKLEN);
      if (privKey) {
        crypto_scalarmult_base(keyPair.publicKey, keyPair.secretKey);
      } else {
        crypto_kx_keypair(keyPair.publicKey, keyPair.secretKey);
      }
      return keyPair;
    }
    function generateSeedKeyPair(seed) {
      assert(seed.byteLength === SKLEN);
      const keyPair = {};
      keyPair.secretKey = b4a.alloc(SKLEN);
      keyPair.publicKey = b4a.alloc(PKLEN);
      crypto_kx_seed_keypair(keyPair.publicKey, keyPair.secretKey, seed);
      return keyPair;
    }
    function dh(pk, lsk) {
      assert(lsk.byteLength === SKLEN);
      assert(pk.byteLength === PKLEN);
      const output = b4a.alloc(DHLEN);
      crypto_scalarmult(output, lsk, pk);
      return output;
    }
  }
});

// node_modules/sodium-universal/memory.js
var require_memory2 = __commonJS({
  "node_modules/sodium-universal/memory.js"(exports, module) {
    init_node_globals();
    module.exports = require_sodium_javascript();
  }
});

// node_modules/sodium-universal/crypto_generichash.js
var require_crypto_generichash2 = __commonJS({
  "node_modules/sodium-universal/crypto_generichash.js"(exports, module) {
    init_node_globals();
    module.exports = require_sodium_javascript();
  }
});

// node_modules/hmac-blake2b/node_modules/nanoassert/index.js
var require_nanoassert2 = __commonJS({
  "node_modules/hmac-blake2b/node_modules/nanoassert/index.js"(exports, module) {
    init_node_globals();
    assert.notEqual = notEqual;
    assert.notOk = notOk;
    assert.equal = equal;
    assert.ok = assert;
    module.exports = assert;
    function equal(a, b, m) {
      assert(a == b, m);
    }
    function notEqual(a, b, m) {
      assert(a != b, m);
    }
    function notOk(t, m) {
      assert(!t, m);
    }
    function assert(t, m) {
      if (!t)
        throw new Error(m || "AssertionError");
    }
  }
});

// node_modules/hmac-blake2b/index.js
var require_hmac_blake2b = __commonJS({
  "node_modules/hmac-blake2b/index.js"(exports, module) {
    init_node_globals();
    var { sodium_malloc, sodium_memzero } = require_memory2();
    var { crypto_generichash, crypto_generichash_batch } = require_crypto_generichash2();
    var assert = require_nanoassert2();
    var HASHLEN = 64;
    var BLOCKLEN = 128;
    var scratch = sodium_malloc(BLOCKLEN * 3);
    var HMACKey = scratch.subarray(BLOCKLEN * 0, BLOCKLEN * 1);
    var OuterKeyPad = scratch.subarray(BLOCKLEN * 1, BLOCKLEN * 2);
    var InnerKeyPad = scratch.subarray(BLOCKLEN * 2, BLOCKLEN * 3);
    module.exports = function hmac(out, data, key) {
      assert(out.byteLength === HASHLEN);
      assert(key.byteLength != null);
      assert(Array.isArray(data) ? data.every((d) => d.byteLength != null) : data.byteLength != null);
      if (key.byteLength > BLOCKLEN) {
        crypto_generichash(HMACKey.subarray(0, HASHLEN), key);
        sodium_memzero(HMACKey.subarray(HASHLEN));
      } else {
        HMACKey.set(key);
        sodium_memzero(HMACKey.subarray(key.byteLength));
      }
      for (var i = 0; i < HMACKey.byteLength; i++) {
        OuterKeyPad[i] = 92 ^ HMACKey[i];
        InnerKeyPad[i] = 54 ^ HMACKey[i];
      }
      sodium_memzero(HMACKey);
      crypto_generichash_batch(out, [InnerKeyPad].concat(data));
      sodium_memzero(InnerKeyPad);
      crypto_generichash_batch(out, [OuterKeyPad].concat(out));
      sodium_memzero(OuterKeyPad);
    };
    module.exports.BYTES = HASHLEN;
    module.exports.KEYBYTES = BLOCKLEN;
  }
});

// node_modules/noise-handshake/hkdf.js
var require_hkdf = __commonJS({
  "node_modules/noise-handshake/hkdf.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var hmacBlake2b = require_hmac_blake2b();
    var b4a = require_browser2();
    var HASHLEN = 64;
    module.exports = {
      hkdf,
      HASHLEN
    };
    function hkdf(salt, inputKeyMaterial, info = "", length = 2 * HASHLEN) {
      const pseudoRandomKey = hkdfExtract(salt, inputKeyMaterial);
      const result = hkdfExpand(pseudoRandomKey, info, length);
      const [k1, k2] = [result.slice(0, HASHLEN), result.slice(HASHLEN)];
      return [k1, k2];
      function hkdfExtract(salt2, inputKeyMaterial2) {
        return hmacDigest(salt2, inputKeyMaterial2);
      }
      function hkdfExpand(key, info2, length2) {
        const T = [b4a.from(info2)];
        const lengthRatio = length2 / HASHLEN;
        for (let i = 0; i < lengthRatio; i++) {
          const infoBuf = b4a.from(info2);
          const toHash = b4a.concat([T[i], infoBuf, b4a.from([i + 1])]);
          T[i + 1] = hmacDigest(key, toHash);
        }
        const result2 = b4a.concat(T.slice(1));
        assert(result2.byteLength === length2, "key expansion failed, length not as expected");
        return result2;
      }
    }
    function hmacDigest(key, input) {
      const hmac = b4a.alloc(HASHLEN);
      hmacBlake2b(hmac, input, key);
      return hmac;
    }
  }
});

// node_modules/noise-handshake/symmetric-state.js
var require_symmetric_state = __commonJS({
  "node_modules/noise-handshake/symmetric-state.js"(exports, module) {
    init_node_globals();
    var sodium = require_sodium_universal();
    var assert = require_nanoassert();
    var b4a = require_browser2();
    var CipherState = require_cipher();
    var curve = require_dh();
    var { HASHLEN, hkdf } = require_hkdf();
    module.exports = class SymmetricState extends CipherState {
      constructor(opts = {}) {
        super();
        this.curve = opts.curve || curve;
        this.digest = b4a.alloc(HASHLEN);
        this.chainingKey = null;
        this.offset = 0;
        this.DH_ALG = this.curve.ALG;
      }
      mixHash(data) {
        accumulateDigest(this.digest, data);
      }
      mixKey(pubkey, seckey) {
        const dh = this.curve.dh(pubkey, seckey);
        const hkdfResult = hkdf(this.chainingKey, dh);
        this.chainingKey = hkdfResult[0];
        this.initialiseKey(hkdfResult[1].subarray(0, 32));
      }
      encryptAndHash(plaintext) {
        const ciphertext = this.encrypt(plaintext, this.digest);
        accumulateDigest(this.digest, ciphertext);
        return ciphertext;
      }
      decryptAndHash(ciphertext) {
        const plaintext = this.decrypt(ciphertext, this.digest);
        accumulateDigest(this.digest, ciphertext);
        return plaintext;
      }
      getHandshakeHash(out) {
        if (!out)
          return this.getHandshakeHash(b4a.alloc(HASHLEN));
        assert(out.byteLength === HASHLEN, `output must be ${HASHLEN} bytes`);
        out.set(this.digest);
        return out;
      }
      split() {
        const res = hkdf(this.chainingKey, b4a.alloc(0));
        return res.map((k) => k.subarray(0, 32));
      }
      _clear() {
        super._clear();
        sodium.sodium_memzero(this.digest);
        sodium.sodium_memzero(this.chainingKey);
        this.digest = null;
        this.chainingKey = null;
        this.offset = null;
        this.curve = null;
      }
      static get alg() {
        return CipherState.alg + "_BLAKE2b";
      }
    };
    function accumulateDigest(digest, input) {
      const toHash = b4a.concat([digest, input]);
      sodium.crypto_generichash(digest, toHash);
    }
  }
});

// node_modules/noise-handshake/noise.js
var require_noise = __commonJS({
  "node_modules/noise-handshake/noise.js"(exports, module) {
    init_node_globals();
    var assert = require_nanoassert();
    var b4a = require_browser2();
    var SymmetricState = require_symmetric_state();
    var { HASHLEN } = require_hkdf();
    var PRESHARE_IS = Symbol("initiator static key preshared");
    var PRESHARE_RS = Symbol("responder static key preshared");
    var TOK_S = Symbol("s");
    var TOK_E = Symbol("e");
    var TOK_ES = Symbol("es");
    var TOK_SE = Symbol("se");
    var TOK_EE = Symbol("ee");
    var TOK_SS = Symbol("ss");
    var HANDSHAKES = Object.freeze({
      XX: [
        [TOK_E],
        [TOK_E, TOK_EE, TOK_S, TOK_ES],
        [TOK_S, TOK_SE]
      ],
      IK: [
        PRESHARE_RS,
        [TOK_E, TOK_ES, TOK_S, TOK_SS],
        [TOK_E, TOK_EE, TOK_SE]
      ]
    });
    var Writer = class {
      constructor() {
        this.size = 0;
        this.buffers = [];
      }
      push(b) {
        this.size += b.byteLength;
        this.buffers.push(b);
      }
      end() {
        const all = b4a.alloc(this.size);
        let offset = 0;
        for (const b of this.buffers) {
          all.set(b, offset);
          offset += b.byteLength;
        }
        return all;
      }
    };
    var Reader = class {
      constructor(buf) {
        this.offset = 0;
        this.buffer = buf;
      }
      shift(n) {
        const start = this.offset;
        const end = this.offset += n;
        if (end > this.buffer.byteLength)
          throw new Error("Insufficient bytes");
        return this.buffer.subarray(start, end);
      }
      end() {
        return this.shift(this.buffer.byteLength - this.offset);
      }
    };
    module.exports = class NoiseState extends SymmetricState {
      constructor(pattern, initiator, staticKeypair, opts = {}) {
        super(opts);
        this.s = staticKeypair || this.curve.generateKeyPair();
        this.e = null;
        this.re = null;
        this.rs = null;
        this.pattern = pattern;
        this.handshake = HANDSHAKES[this.pattern].slice();
        this.protocol = b4a.from([
          "Noise",
          this.pattern,
          this.DH_ALG,
          this.CIPHER_ALG,
          "BLAKE2b"
        ].join("_"));
        this.initiator = initiator;
        this.complete = false;
        this.rx = null;
        this.tx = null;
        this.hash = null;
      }
      initialise(prologue, remoteStatic) {
        if (this.protocol.byteLength <= HASHLEN)
          this.digest.set(this.protocol);
        else
          this.mixHash(this.protocol);
        this.chainingKey = b4a.from(this.digest);
        this.mixHash(prologue);
        while (!Array.isArray(this.handshake[0])) {
          const message = this.handshake.shift();
          assert(message === PRESHARE_RS || message === PRESHARE_IS, "Unexpected pattern");
          const takeRemoteKey = this.initiator ? message === PRESHARE_RS : message === PRESHARE_IS;
          if (takeRemoteKey)
            this.rs = remoteStatic;
          const key = takeRemoteKey ? this.rs : this.s.publicKey;
          assert(key != null, "Remote pubkey required");
          this.mixHash(key);
        }
      }
      final() {
        const [k1, k2] = this.split();
        this.tx = this.initiator ? k1 : k2;
        this.rx = this.initiator ? k2 : k1;
        this.complete = true;
        this.hash = this.getHandshakeHash();
        this._clear();
      }
      recv(buf) {
        const r = new Reader(buf);
        for (const pattern of this.handshake.shift()) {
          switch (pattern) {
            case TOK_E:
              this.re = r.shift(this.curve.PKLEN);
              this.mixHash(this.re);
              break;
            case TOK_S: {
              const klen = this.hasKey ? this.curve.PKLEN + 16 : this.curve.PKLEN;
              this.rs = this.decryptAndHash(r.shift(klen));
              break;
            }
            case TOK_EE:
            case TOK_ES:
            case TOK_SE:
            case TOK_SS: {
              const useStatic = keyPattern(pattern, this.initiator);
              const localKey = useStatic.local ? this.s.secretKey : this.e.secretKey;
              const remoteKey = useStatic.remote ? this.rs : this.re;
              this.mixKey(remoteKey, localKey);
              break;
            }
            default:
              throw new Error("Unexpected message");
          }
        }
        const payload = this.decryptAndHash(r.end());
        if (!this.handshake.length)
          this.final();
        return payload;
      }
      send(payload = b4a.alloc(0)) {
        const w = new Writer();
        for (const pattern of this.handshake.shift()) {
          switch (pattern) {
            case TOK_E:
              if (this.e === null)
                this.e = this.curve.generateKeyPair();
              this.mixHash(this.e.publicKey);
              w.push(this.e.publicKey);
              break;
            case TOK_S:
              w.push(this.encryptAndHash(this.s.publicKey));
              break;
            case TOK_ES:
            case TOK_SE:
            case TOK_EE:
            case TOK_SS: {
              const useStatic = keyPattern(pattern, this.initiator);
              const localKey = useStatic.local ? this.s.secretKey : this.e.secretKey;
              const remoteKey = useStatic.remote ? this.rs : this.re;
              this.mixKey(remoteKey, localKey);
              break;
            }
            default:
              throw new Error("Unexpected message");
          }
        }
        w.push(this.encryptAndHash(payload));
        const response = w.end();
        if (!this.handshake.length)
          this.final();
        return response;
      }
      _clear() {
        super._clear();
        this.e.secretKey.fill(0);
        this.e.publicKey.fill(0);
        this.re.fill(0);
        this.e = null;
        this.re = null;
      }
    };
    function keyPattern(pattern, initiator) {
      const ret = {
        local: false,
        remote: false
      };
      switch (pattern) {
        case TOK_EE:
          return ret;
        case TOK_ES:
          ret.local ^= !initiator;
          ret.remote ^= initiator;
          return ret;
        case TOK_SE:
          ret.local ^= initiator;
          ret.remote ^= !initiator;
          return ret;
        case TOK_SS:
          ret.local ^= 1;
          ret.remote ^= 1;
          return ret;
      }
    }
  }
});

// node_modules/@hyperswarm/secret-stream/lib/handshake.js
var require_handshake = __commonJS({
  "node_modules/@hyperswarm/secret-stream/lib/handshake.js"(exports, module) {
    init_node_globals();
    var sodium = require_sodium_universal();
    var curve = require_noise_curve_ed();
    var Noise = require_noise();
    var b4a = require_browser2();
    var EMPTY = b4a.alloc(0);
    module.exports = class Handshake {
      constructor(isInitiator, keyPair, remotePublicKey, pattern) {
        this.isInitiator = isInitiator;
        this.keyPair = keyPair;
        this.noise = new Noise(pattern, isInitiator, keyPair, { curve });
        this.noise.initialise(EMPTY, remotePublicKey);
        this.destroyed = false;
      }
      static keyPair(seed) {
        const publicKey = b4a.alloc(32);
        const secretKey = b4a.alloc(64);
        if (seed)
          sodium.crypto_sign_seed_keypair(publicKey, secretKey, seed);
        else
          sodium.crypto_sign_keypair(publicKey, secretKey);
        return { publicKey, secretKey };
      }
      recv(data) {
        try {
          this.noise.recv(data);
          if (this.noise.complete)
            return this._return(null);
          return this.send();
        } catch {
          this.destroy();
          return null;
        }
      }
      send() {
        try {
          const data = this.noise.send();
          const wrap = b4a.allocUnsafe(data.byteLength + 3);
          writeUint24le(data.byteLength, wrap);
          wrap.set(data, 3);
          return this._return(wrap);
        } catch {
          this.destroy();
          return null;
        }
      }
      destroy() {
        if (this.destroyed)
          return;
        this.destroyed = true;
      }
      _return(data) {
        const tx = this.noise.complete ? b4a.toBuffer(this.noise.tx) : null;
        const rx = this.noise.complete ? b4a.toBuffer(this.noise.rx) : null;
        const hash = this.noise.complete ? b4a.toBuffer(this.noise.hash) : null;
        const remotePublicKey = this.noise.complete ? b4a.toBuffer(this.noise.rs) : null;
        return {
          data,
          remotePublicKey,
          hash,
          tx,
          rx
        };
      }
    };
    function writeUint24le(n, buf) {
      buf[0] = n & 255;
      buf[1] = n >>> 8 & 255;
      buf[2] = n >>> 16 & 255;
    }
  }
});

// node_modules/@hyperswarm/secret-stream/index.js
var require_secret_stream = __commonJS({
  "node_modules/@hyperswarm/secret-stream/index.js"(exports, module) {
    init_node_globals();
    var { Pull, Push, HEADERBYTES, KEYBYTES, ABYTES } = require_sodium_secretstream();
    var sodium = require_sodium_universal();
    var { Duplex } = require_streamx();
    var b4a = require_browser2();
    var Bridge = require_bridge();
    var Handshake = require_handshake();
    var IDHEADERBYTES = HEADERBYTES + 32;
    var slab = b4a.alloc(96);
    var NS = slab.subarray(0, 32);
    var NS_INITIATOR = slab.subarray(32, 64);
    var NS_RESPONDER = slab.subarray(64, 96);
    sodium.crypto_generichash(NS, b4a.from("hyperswarm/secret-stream"));
    sodium.crypto_generichash(NS_INITIATOR, b4a.from([0]), NS);
    sodium.crypto_generichash(NS_RESPONDER, b4a.from([1]), NS);
    module.exports = class NoiseSecretStream extends Duplex {
      constructor(isInitiator, rawStream, opts = {}) {
        super();
        if (typeof isInitiator !== "boolean") {
          throw new Error("isInitiator should be a boolean");
        }
        this.noiseStream = this;
        this.isInitiator = isInitiator;
        this.rawStream = null;
        this.publicKey = opts.publicKey || null;
        this.remotePublicKey = opts.remotePublicKey || null;
        this.handshakeHash = null;
        this.userData = null;
        let openedDone = null;
        this.opened = new Promise((resolve) => {
          openedDone = resolve;
        });
        this._rawStream = null;
        this._handshake = null;
        this._handshakePattern = opts.pattern || null;
        this._handshakeDone = null;
        this._state = 0;
        this._len = 0;
        this._tmp = 1;
        this._message = null;
        this._openedDone = openedDone;
        this._startDone = null;
        this._drainDone = null;
        this._outgoingPlain = null;
        this._outgoingWrapped = null;
        this._utp = null;
        this._setup = true;
        this._ended = 2;
        this._encrypt = null;
        this._decrypt = null;
        if (opts.autoStart !== false)
          this.start(rawStream, opts);
        this.resume();
        this.pause();
      }
      static keyPair(seed) {
        return Handshake.keyPair(seed);
      }
      static id(handshakeHash, isInitiator, id) {
        return streamId(handshakeHash, isInitiator, id);
      }
      start(rawStream, opts = {}) {
        if (rawStream) {
          this.rawStream = rawStream;
          this._rawStream = rawStream;
          if (typeof this.rawStream.setContentSize === "function") {
            this._utp = rawStream;
          }
        } else {
          this.rawStream = new Bridge(this);
          this._rawStream = this.rawStream.reverse;
        }
        this.rawStream.on("error", this._onrawerror.bind(this));
        this.rawStream.on("close", this._onrawclose.bind(this));
        this._startHandshake(opts.handshake, opts.keyPair || null);
        this._continueOpen(null);
        if (this.destroying)
          return;
        if (opts.data)
          this._onrawdata(opts.data);
        if (opts.ended)
          this._onrawend();
      }
      _continueOpen(err) {
        if (err)
          this.destroy(err);
        if (this._startDone === null)
          return;
        const done = this._startDone;
        this._startDone = null;
        this._open(done);
      }
      _onkeypairpromise(p) {
        const self2 = this;
        const cont = this._continueOpen.bind(this);
        p.then(onkeypair, cont);
        function onkeypair(kp) {
          self2._onkeypair(kp);
          cont(null);
        }
      }
      _onkeypair(keyPair) {
        const pattern = this._handshakePattern || "XX";
        const remotePublicKey = this.remotePublicKey;
        this._handshake = new Handshake(this.isInitiator, keyPair, remotePublicKey, pattern);
        this.publicKey = this._handshake.keyPair.publicKey;
      }
      _startHandshake(handshake, keyPair) {
        if (handshake) {
          const { tx, rx, hash, publicKey, remotePublicKey } = handshake;
          this._setupSecretStream(tx, rx, hash, publicKey, remotePublicKey);
          return;
        }
        if (!keyPair)
          keyPair = Handshake.keyPair();
        if (typeof keyPair.then === "function") {
          this._onkeypairpromise(keyPair);
        } else {
          this._onkeypair(keyPair);
        }
      }
      _onrawerror(err) {
        this.destroy(err);
      }
      _onrawclose() {
        if (this._ended !== 0)
          this.destroy();
      }
      _onrawdata(data) {
        let offset = 0;
        do {
          switch (this._state) {
            case 0: {
              while (this._tmp !== 16777216 && offset < data.length) {
                const v = data[offset++];
                this._len += this._tmp * v;
                this._tmp *= 256;
              }
              if (this._tmp === 16777216) {
                this._tmp = 0;
                this._state = 1;
                const unprocessed = data.length - offset;
                if (unprocessed < this._len && this._utp !== null)
                  this._utp.setContentSize(this._len - unprocessed);
              }
              break;
            }
            case 1: {
              const missing = this._len - this._tmp;
              const end = missing + offset;
              if (this._message === null && end <= data.length) {
                this._message = data.subarray(offset, end);
                offset += missing;
                this._incoming();
                break;
              }
              const unprocessed = data.length - offset;
              if (this._message === null) {
                this._message = b4a.allocUnsafe(this._len);
              }
              b4a.copy(data, this._message, this._tmp, offset);
              this._tmp += unprocessed;
              if (end <= data.length) {
                offset += missing;
                this._incoming();
              } else {
                offset += unprocessed;
              }
              break;
            }
          }
        } while (offset < data.length && !this.destroying);
      }
      _onrawend() {
        this._ended--;
        this.push(null);
      }
      _onrawdrain() {
        const drain = this._drainDone;
        if (drain === null)
          return;
        this._drainDone = null;
        drain();
      }
      _read(cb) {
        this.rawStream.resume();
        cb(null);
      }
      _incoming() {
        const message = this._message;
        this._state = 0;
        this._len = 0;
        this._tmp = 1;
        this._message = null;
        if (this._setup === true) {
          if (this._handshake) {
            this._onhandshakert(this._handshake.recv(message));
          } else {
            if (message.byteLength !== IDHEADERBYTES) {
              this.destroy(new Error("Invalid header message received"));
              return;
            }
            const remoteId = message.subarray(0, 32);
            const expectedId = streamId(this.handshakeHash, !this.isInitiator);
            const header = message.subarray(32);
            if (!b4a.equals(expectedId, remoteId)) {
              this.destroy(new Error("Invalid header received"));
              return;
            }
            this._decrypt.init(header);
            this._setup = false;
          }
          return;
        }
        if (message.length < ABYTES) {
          this.destroy(new Error("Invalid message received"));
          return;
        }
        const plain = message.subarray(1, message.byteLength - ABYTES + 1);
        try {
          this._decrypt.next(message, plain);
        } catch (err) {
          this.destroy(err);
          return;
        }
        if (this.push(plain) === false) {
          this.rawStream.pause();
        }
      }
      _onhandshakert(h) {
        if (this._handshakeDone === null)
          return;
        if (h !== null) {
          if (h.data)
            this._rawStream.write(h.data);
          if (!h.tx)
            return;
        }
        const done = this._handshakeDone;
        const publicKey = this._handshake.keyPair.publicKey;
        this._handshakeDone = null;
        this._handshake = null;
        if (h === null)
          return done(new Error("Noise handshake failed"));
        this._setupSecretStream(h.tx, h.rx, h.hash, publicKey, h.remotePublicKey);
        this._resolveOpened(true);
        done(null);
      }
      _setupSecretStream(tx, rx, handshakeHash, publicKey, remotePublicKey) {
        const buf = b4a.allocUnsafe(3 + IDHEADERBYTES);
        writeUint24le(IDHEADERBYTES, buf);
        this._encrypt = new Push(tx.subarray(0, KEYBYTES), void 0, buf.subarray(3 + 32));
        this._decrypt = new Pull(rx.subarray(0, KEYBYTES));
        this.publicKey = publicKey;
        this.remotePublicKey = remotePublicKey;
        this.handshakeHash = handshakeHash;
        const id = buf.subarray(3, 3 + 32);
        streamId(handshakeHash, this.isInitiator, id);
        this.emit("handshake");
        if (this.rawStream !== this._rawStream)
          this.rawStream.emit("handshake");
        if (this.destroying)
          return;
        this._rawStream.write(buf);
      }
      _open(cb) {
        if (this._rawStream === null || this._handshake === null && this._encrypt === null) {
          this._startDone = cb;
          return;
        }
        this._rawStream.on("data", this._onrawdata.bind(this));
        this._rawStream.on("end", this._onrawend.bind(this));
        this._rawStream.on("drain", this._onrawdrain.bind(this));
        if (this._encrypt !== null) {
          this._resolveOpened(true);
          return cb(null);
        }
        this._handshakeDone = cb;
        if (this.isInitiator)
          this._onhandshakert(this._handshake.send());
      }
      _predestroy() {
        if (this.rawStream) {
          const error = this._readableState.error || this._writableState.error;
          this.rawStream.destroy(error);
        }
        if (this._startDone !== null) {
          const done = this._startDone;
          this._startDone = null;
          done(new Error("Stream destroyed"));
        }
        if (this._handshakeDone !== null) {
          const done = this._handshakeDone;
          this._handshakeDone = null;
          done(new Error("Stream destroyed"));
        }
        if (this._drainDone !== null) {
          const done = this._drainDone;
          this._drainDone = null;
          done(new Error("Stream destroyed"));
        }
      }
      _write(data, cb) {
        let wrapped = this._outgoingWrapped;
        if (data !== this._outgoingPlain) {
          if (typeof data === "string")
            data = b4a.from(data);
          wrapped = b4a.allocUnsafe(data.byteLength + 3 + ABYTES);
          wrapped.set(data, 4);
        } else {
          this._outgoingWrapped = this._outgoingPlain = null;
        }
        writeUint24le(wrapped.byteLength - 3, wrapped);
        this._encrypt.next(wrapped.subarray(4, 4 + data.byteLength), wrapped.subarray(3));
        if (this._rawStream.write(wrapped) === false) {
          this._drainDone = cb;
        } else {
          cb(null);
        }
      }
      _final(cb) {
        this._ended--;
        this._rawStream.end();
        cb(null);
      }
      _resolveOpened(val2) {
        if (this._openedDone !== null) {
          const opened = this._openedDone;
          this._openedDone = null;
          opened(val2);
          if (val2)
            this.emit("connect");
        }
      }
      _destroy(cb) {
        this._resolveOpened(false);
        cb(null);
      }
      alloc(len) {
        const buf = b4a.allocUnsafe(len + 3 + ABYTES);
        this._outgoingWrapped = buf;
        this._outgoingPlain = buf.subarray(4, buf.byteLength - ABYTES + 1);
        return this._outgoingPlain;
      }
    };
    function writeUint24le(n, buf) {
      buf[0] = n & 255;
      buf[1] = n >>> 8 & 255;
      buf[2] = n >>> 16 & 255;
    }
    function streamId(handshakeHash, isInitiator, out = b4a.allocUnsafe(32)) {
      sodium.crypto_generichash(out, handshakeHash, isInitiator ? NS_INITIATOR : NS_RESPONDER);
      return out;
    }
  }
});

// node_modules/codecs/index.js
var require_codecs = __commonJS({
  "node_modules/codecs/index.js"(exports, module) {
    init_node_globals();
    var b4a = require_browser2();
    module.exports = codecs;
    codecs.ascii = createString("ascii");
    codecs.utf8 = createString("utf-8");
    codecs.hex = createString("hex");
    codecs.base64 = createString("base64");
    codecs.ucs2 = createString("ucs2");
    codecs.utf16le = createString("utf16le");
    codecs.ndjson = createJSON(true);
    codecs.json = createJSON(false);
    codecs.binary = {
      name: "binary",
      encode: function encodeBinary(obj) {
        return typeof obj === "string" ? b4a.from(obj, "utf-8") : b4a.toBuffer(obj);
      },
      decode: function decodeBinary(buf) {
        return b4a.toBuffer(buf);
      }
    };
    function codecs(fmt, fallback) {
      if (typeof fmt === "object" && fmt && fmt.encode && fmt.decode)
        return fmt;
      switch (fmt) {
        case "ndjson":
          return codecs.ndjson;
        case "json":
          return codecs.json;
        case "ascii":
          return codecs.ascii;
        case "utf-8":
        case "utf8":
          return codecs.utf8;
        case "hex":
          return codecs.hex;
        case "base64":
          return codecs.base64;
        case "ucs-2":
        case "ucs2":
          return codecs.ucs2;
        case "utf16-le":
        case "utf16le":
          return codecs.utf16le;
      }
      return fallback !== void 0 ? fallback : codecs.binary;
    }
    function createJSON(newline) {
      return {
        name: newline ? "ndjson" : "json",
        encode: newline ? encodeNDJSON : encodeJSON,
        decode: function decodeJSON(buf) {
          return JSON.parse(b4a.toString(buf));
        }
      };
      function encodeJSON(val2) {
        return b4a.from(JSON.stringify(val2));
      }
      function encodeNDJSON(val2) {
        return b4a.from(JSON.stringify(val2) + "\n");
      }
    }
    function createString(type) {
      return {
        name: type,
        encode: function encodeString(val2) {
          if (typeof val2 !== "string")
            val2 = val2.toString();
          return b4a.from(val2, type);
        },
        decode: function decodeString(buf) {
          return b4a.toString(buf, type);
        }
      };
    }
  }
});

// node_modules/hypercore/lib/messages.js
var require_messages = __commonJS({
  "node_modules/hypercore/lib/messages.js"(exports) {
    init_node_globals();
    var c = require_compact_encoding();
    var node = exports.node = {
      preencode(state, n) {
        c.uint.preencode(state, n.index);
        c.uint.preencode(state, n.size);
        c.fixed32.preencode(state, n.hash);
      },
      encode(state, n) {
        c.uint.encode(state, n.index);
        c.uint.encode(state, n.size);
        c.fixed32.encode(state, n.hash);
      },
      decode(state) {
        return {
          index: c.uint.decode(state),
          size: c.uint.decode(state),
          hash: c.fixed32.decode(state)
        };
      }
    };
    var nodeArray = c.array(node);
    var dataUpgrade = {
      preencode(state, u) {
        c.uint.preencode(state, u.start);
        c.uint.preencode(state, u.length);
        nodeArray.preencode(state, u.nodes);
        nodeArray.preencode(state, u.additionalNodes);
        c.buffer.preencode(state, u.signature);
      },
      encode(state, u) {
        c.uint.encode(state, u.start);
        c.uint.encode(state, u.length);
        nodeArray.encode(state, u.nodes);
        nodeArray.encode(state, u.additionalNodes);
        c.buffer.encode(state, u.signature);
      },
      decode(state) {
        return {
          start: c.uint.decode(state),
          length: c.uint.decode(state),
          nodes: nodeArray.decode(state),
          additionalNodes: nodeArray.decode(state),
          signature: c.buffer.decode(state)
        };
      }
    };
    var dataSeek = {
      preencode(state, s) {
        c.uint.preencode(state, s.bytes);
        nodeArray.preencode(state, s.nodes);
      },
      encode(state, s) {
        c.uint.encode(state, s.bytes);
        nodeArray.encode(state, s.nodes);
      },
      decode(state) {
        return {
          bytes: c.uint.decode(state),
          nodes: nodeArray.decode(state)
        };
      }
    };
    var dataBlock = {
      preencode(state, b) {
        c.uint.preencode(state, b.index);
        c.buffer.preencode(state, b.value);
        nodeArray.preencode(state, b.nodes);
      },
      encode(state, b) {
        c.uint.encode(state, b.index);
        c.buffer.encode(state, b.value);
        nodeArray.encode(state, b.nodes);
      },
      decode(state) {
        return {
          index: c.uint.decode(state),
          value: c.buffer.decode(state),
          nodes: nodeArray.decode(state)
        };
      }
    };
    exports.data = {
      preencode(state, d) {
        c.uint.preencode(state, d.fork);
        state.end++;
        if (d.block)
          dataBlock.preencode(state, d.block);
        if (d.seek)
          dataSeek.preencode(state, d.seek);
        if (d.upgrade)
          dataUpgrade.preencode(state, d.upgrade);
      },
      encode(state, d) {
        c.uint.encode(state, d.fork);
        const s = state.start++;
        let flags = 0;
        if (d.block) {
          flags |= 1;
          dataBlock.encode(state, d.block);
        }
        if (d.seek) {
          flags |= 2;
          dataSeek.encode(state, d.seek);
        }
        if (d.upgrade) {
          flags |= 4;
          dataUpgrade.encode(state, d.upgrade);
        }
        state.buffer[s] = flags;
      },
      decode(state) {
        const fork = c.uint.decode(state);
        const flags = c.uint.decode(state);
        return {
          fork,
          block: (flags & 1) === 0 ? null : dataBlock.decode(state),
          seek: (flags & 2) === 0 ? null : dataSeek.decode(state),
          upgrade: (flags & 4) === 0 ? null : dataUpgrade.decode(state)
        };
      }
    };
    var requestBlock = {
      preencode(state, b) {
        c.uint.preencode(state, b.index);
        c.bool.preencode(state, b.value);
        c.uint.preencode(state, b.nodes);
      },
      encode(state, b) {
        c.uint.encode(state, b.index);
        c.bool.encode(state, b.value);
        c.uint.encode(state, b.nodes);
      },
      decode(state) {
        return {
          index: c.uint.decode(state),
          value: c.bool.decode(state),
          nodes: c.uint.decode(state)
        };
      }
    };
    var requestSeek = {
      preencode(state, s) {
        c.uint.preencode(state, s.bytes);
      },
      encode(state, s) {
        c.uint.encode(state, s.bytes);
      },
      decode(state) {
        return {
          bytes: c.uint.decode(state)
        };
      }
    };
    var requestUpgrade = {
      preencode(state, u) {
        c.uint.preencode(state, u.start);
        c.uint.preencode(state, u.length);
      },
      encode(state, u) {
        c.uint.encode(state, u.start);
        c.uint.encode(state, u.length);
      },
      decode(state) {
        return {
          start: c.uint.decode(state),
          length: c.uint.decode(state)
        };
      }
    };
    exports.request = {
      preencode(state, r) {
        c.uint.preencode(state, r.fork);
        state.end++;
        if (r.block)
          requestBlock.preencode(state, r.block);
        if (r.seek)
          requestSeek.preencode(state, r.seek);
        if (r.upgrade)
          requestUpgrade.preencode(state, r.upgrade);
      },
      encode(state, r) {
        c.uint.encode(state, r.fork);
        const s = state.start++;
        let flags = 0;
        if (r.block) {
          flags |= 1;
          requestBlock.encode(state, r.block);
        }
        if (r.seek) {
          flags |= 2;
          requestSeek.encode(state, r.seek);
        }
        if (r.upgrade) {
          flags |= 4;
          requestUpgrade.encode(state, r.upgrade);
        }
        state.buffer[s] = flags;
      },
      decode(state) {
        const fork = c.uint.decode(state);
        const flags = c.uint.decode(state);
        return {
          fork,
          block: (flags & 1) === 0 ? null : requestBlock.decode(state),
          seek: (flags & 2) === 0 ? null : requestSeek.decode(state),
          upgrade: (flags & 4) === 0 ? null : requestUpgrade.decode(state)
        };
      }
    };
    exports.have = {
      preencode(state, h) {
        c.uint.preencode(state, h.start);
        if (h.length > 1)
          c.uint.preencode(state, h.length);
      },
      encode(state, h) {
        c.uint.encode(state, h.start);
        if (h.length > 1)
          c.uint.encode(state, h.length);
      },
      decode(state) {
        return {
          start: c.uint.decode(state),
          length: state.start < state.end ? c.uint.decode(state) : 1
        };
      }
    };
    exports.bitfield = {
      preencode(state, b) {
        c.uint.preencode(state, b.start);
        c.uint32array.preencode(state, b.bitfield);
      },
      encode(state, b) {
        c.uint.encode(state, b.start);
        c.uint32array.encode(state, b.bitfield);
      },
      decode(state) {
        return {
          start: c.uint.decode(state),
          bitfield: c.uint32array.decode(state)
        };
      }
    };
    exports.info = {
      preencode(state, i) {
        c.uint.preencode(state, i.length);
        c.uint.preencode(state, i.fork);
        c.uint.preencode(state, 1);
      },
      encode(state, i) {
        c.uint.encode(state, i.length);
        c.uint.encode(state, i.fork);
        c.uint.encode(state, (i.uploading ? 1 : 0) | (i.downloading ? 2 : 0));
      },
      decode(state) {
        const i = {
          length: c.uint.decode(state),
          fork: c.uint.decode(state),
          uploading: true,
          downloading: true
        };
        if (state.end <= state.start)
          return i;
        const flags = c.uint.decode(state);
        i.uploading = (flags & 1) !== 0;
        i.downloading = (flags & 2) !== 0;
        return i;
      }
    };
    exports.handshake = {
      preencode(state, h) {
        c.uint.preencode(state, h.protocolVersion);
        c.string.preencode(state, h.userAgent);
      },
      encode(state, h) {
        c.uint.encode(state, h.protocolVersion);
        c.string.encode(state, h.userAgent);
      },
      decode(state) {
        return {
          protocolVersion: c.uint.decode(state),
          userAgent: c.string.decode(state)
        };
      }
    };
    exports.extension = {
      preencode(state, a) {
        c.uint.preencode(state, a.alias);
        c.string.preencode(state, a.name);
      },
      encode(state, a) {
        c.uint.encode(state, a.alias);
        c.string.encode(state, a.name);
      },
      decode(state) {
        return {
          alias: c.uint.decode(state),
          name: c.string.decode(state)
        };
      }
    };
    exports.core = {
      preencode(state, m) {
        c.uint.preencode(state, m.alias);
        c.fixed32.preencode(state, m.discoveryKey);
        c.fixed32.preencode(state, m.capability);
      },
      encode(state, m) {
        c.uint.encode(state, m.alias);
        c.fixed32.encode(state, m.discoveryKey);
        c.fixed32.encode(state, m.capability);
      },
      decode(state) {
        return {
          alias: c.uint.decode(state),
          discoveryKey: c.fixed32.decode(state),
          capability: c.fixed32.decode(state)
        };
      }
    };
    exports.unknownCore = {
      preencode(state, m) {
        c.fixed32.preencode(state, m.discoveryKey);
      },
      encode(state, m) {
        c.fixed32.encode(state, m.discoveryKey);
      },
      decode(state) {
        return { discoveryKey: c.fixed32.decode(state) };
      }
    };
    var keyValue = {
      preencode(state, p) {
        c.string.preencode(state, p.key);
        c.buffer.preencode(state, p.value);
      },
      encode(state, p) {
        c.string.encode(state, p.key);
        c.buffer.encode(state, p.value);
      },
      decode(state) {
        return {
          key: c.string.decode(state),
          value: c.buffer.decode(state)
        };
      }
    };
    var treeUpgrade = {
      preencode(state, u) {
        c.uint.preencode(state, u.fork);
        c.uint.preencode(state, u.ancestors);
        c.uint.preencode(state, u.length);
        c.buffer.preencode(state, u.signature);
      },
      encode(state, u) {
        c.uint.encode(state, u.fork);
        c.uint.encode(state, u.ancestors);
        c.uint.encode(state, u.length);
        c.buffer.encode(state, u.signature);
      },
      decode(state) {
        return {
          fork: c.uint.decode(state),
          ancestors: c.uint.decode(state),
          length: c.uint.decode(state),
          signature: c.buffer.decode(state)
        };
      }
    };
    var bitfieldUpdate = {
      preencode(state, b) {
        state.end++;
        c.uint.preencode(state, b.start);
        c.uint.preencode(state, b.length);
      },
      encode(state, b) {
        state.buffer[state.start++] = b.drop ? 1 : 0;
        c.uint.encode(state, b.start);
        c.uint.encode(state, b.length);
      },
      decode(state) {
        const flags = c.uint.decode(state);
        return {
          drop: (flags & 1) !== 0,
          start: c.uint.decode(state),
          length: c.uint.decode(state)
        };
      }
    };
    exports.oplogEntry = {
      preencode(state, m) {
        state.end++;
        if (m.userData)
          keyValue.preencode(state, m.userData);
        if (m.treeNodes)
          nodeArray.preencode(state, m.treeNodes);
        if (m.treeUpgrade)
          treeUpgrade.preencode(state, m.treeUpgrade);
        if (m.bitfield)
          bitfieldUpdate.preencode(state, m.bitfield);
      },
      encode(state, m) {
        const s = state.start++;
        let flags = 0;
        if (m.userData) {
          flags |= 1;
          keyValue.encode(state, m.userData);
        }
        if (m.treeNodes) {
          flags |= 2;
          nodeArray.encode(state, m.treeNodes);
        }
        if (m.treeUpgrade) {
          flags |= 4;
          treeUpgrade.encode(state, m.treeUpgrade);
        }
        if (m.bitfield) {
          flags |= 8;
          bitfieldUpdate.encode(state, m.bitfield);
        }
        state.buffer[s] = flags;
      },
      decode(state) {
        const flags = c.uint.decode(state);
        return {
          userData: (flags & 1) !== 0 ? keyValue.decode(state) : null,
          treeNodes: (flags & 2) !== 0 ? nodeArray.decode(state) : null,
          treeUpgrade: (flags & 4) !== 0 ? treeUpgrade.decode(state) : null,
          bitfield: (flags & 8) !== 0 ? bitfieldUpdate.decode(state) : null
        };
      }
    };
    var keyPair = {
      preencode(state, kp) {
        c.buffer.preencode(state, kp.publicKey);
        c.buffer.preencode(state, kp.secretKey);
      },
      encode(state, kp) {
        c.buffer.encode(state, kp.publicKey);
        c.buffer.encode(state, kp.secretKey);
      },
      decode(state) {
        return {
          publicKey: c.buffer.decode(state),
          secretKey: c.buffer.decode(state)
        };
      }
    };
    var reorgHint = {
      preencode(state, r) {
        c.uint.preencode(state, r.from);
        c.uint.preencode(state, r.to);
        c.uint.preencode(state, r.ancestors);
      },
      encode(state, r) {
        c.uint.encode(state, r.from);
        c.uint.encode(state, r.to);
        c.uint.encode(state, r.ancestors);
      },
      decode(state) {
        return {
          from: c.uint.decode(state),
          to: c.uint.decode(state),
          ancestors: c.uint.decode(state)
        };
      }
    };
    var reorgHintArray = c.array(reorgHint);
    var hints = {
      preencode(state, h) {
        reorgHintArray.preencode(state, h.reorgs);
      },
      encode(state, h) {
        reorgHintArray.encode(state, h.reorgs);
      },
      decode(state) {
        return {
          reorgs: reorgHintArray.decode(state)
        };
      }
    };
    var treeHeader = {
      preencode(state, t) {
        c.uint.preencode(state, t.fork);
        c.uint.preencode(state, t.length);
        c.buffer.preencode(state, t.rootHash);
        c.buffer.preencode(state, t.signature);
      },
      encode(state, t) {
        c.uint.encode(state, t.fork);
        c.uint.encode(state, t.length);
        c.buffer.encode(state, t.rootHash);
        c.buffer.encode(state, t.signature);
      },
      decode(state) {
        return {
          fork: c.uint.decode(state),
          length: c.uint.decode(state),
          rootHash: c.buffer.decode(state),
          signature: c.buffer.decode(state)
        };
      }
    };
    var types = {
      preencode(state, t) {
        c.string.preencode(state, t.tree);
        c.string.preencode(state, t.bitfield);
        c.string.preencode(state, t.signer);
      },
      encode(state, t) {
        c.string.encode(state, t.tree);
        c.string.encode(state, t.bitfield);
        c.string.encode(state, t.signer);
      },
      decode(state) {
        return {
          tree: c.string.decode(state),
          bitfield: c.string.decode(state),
          signer: c.string.decode(state)
        };
      }
    };
    var keyValueArray = c.array(keyValue);
    exports.oplogHeader = {
      preencode(state, h) {
        state.end += 1;
        types.preencode(state, h.types);
        keyValueArray.preencode(state, h.userData);
        treeHeader.preencode(state, h.tree);
        keyPair.preencode(state, h.signer);
        hints.preencode(state, h.hints);
      },
      encode(state, h) {
        state.buffer[state.start++] = 0;
        types.encode(state, h.types);
        keyValueArray.encode(state, h.userData);
        treeHeader.encode(state, h.tree);
        keyPair.encode(state, h.signer);
        hints.encode(state, h.hints);
      },
      decode(state) {
        const version = c.uint.decode(state);
        if (version !== 0) {
          throw new Error("Invalid header version. Expected 0, got " + version);
        }
        return {
          types: types.decode(state),
          userData: keyValueArray.decode(state),
          tree: treeHeader.decode(state),
          signer: keyPair.decode(state),
          hints: hints.decode(state)
        };
      }
    };
  }
});

// node_modules/hypercore/lib/protocol.js
var require_protocol = __commonJS({
  "node_modules/hypercore/lib/protocol.js"(exports, module) {
    init_node_globals();
    var { uint, from: fromEncoding } = require_compact_encoding();
    var b4a = require_browser2();
    var safetyCatch = require_safety_catch();
    var codecs = require_codecs();
    var sodium = require_sodium_universal();
    var messages = require_messages();
    var slab = b4a.alloc(96);
    var NS = slab.subarray(0, 32);
    var NS_HYPERCORE_INITIATOR = slab.subarray(32, 64);
    var NS_HYPERCORE_RESPONDER = slab.subarray(64, 96);
    sodium.crypto_generichash(NS, b4a.from("hypercore"));
    sodium.crypto_generichash(NS_HYPERCORE_INITIATOR, b4a.from([0]), NS);
    sodium.crypto_generichash(NS_HYPERCORE_RESPONDER, b4a.from([1]), NS);
    var Extension = class {
      constructor(protocol, type, name, handlers) {
        this.protocol = protocol;
        this.name = name;
        this.type = type;
        this.peers = /* @__PURE__ */ new Set();
        this.aliased = !!handlers.aliased;
        this.remoteSupports = false;
        this.destroyed = false;
        this.onerror = handlers.onerror || noop;
        this.onclose = handlers.onclose || noop;
        this.onmessage = handlers.onmessage || noop;
        this.onremotesupports = handlers.onremotesupports || noop;
        this.encoding = fromEncoding(codecs(handlers.encoding || "binary"));
        this.announce();
      }
      announce() {
        if (this.destroyed)
          return;
        this.protocol.send(1, messages.extension, -1, { alias: this.type, name: this.name });
      }
      send(message) {
        if (this.destroyed)
          return;
        return this._sendAlias(message, -1);
      }
      _sendAlias(message, alias) {
        if (this.destroyed)
          return;
        if (this.remoteSupports) {
          return this.protocol.send(this.type, this.encoding, alias, message);
        }
        this.protocol.cork();
        this.announce();
        this.protocol.send(this.type, this.encoding, alias, message);
        this.protocol.uncork();
        return false;
      }
      _onremotesupports() {
        if (this.destroyed)
          return;
        this.remoteSupports = true;
        this.onremotesupports(this);
        for (const peer of this.peers) {
          peer.onremotesupports(peer);
        }
      }
      _onmessage(state) {
        if (this.destroyed)
          return;
        if (!this.aliased) {
          this.onmessage(this.encoding.decode(state));
          return;
        }
        const alias = uint.decode(state);
        const m = this.encoding.decode(state);
        for (const peer of this.peers) {
          if (peer.alias === alias) {
            peer.onmessage(m, peer.peer);
          }
        }
      }
      destroy() {
        if (this.destroyed)
          return;
        this.destroyed = true;
        this.protocol.unregisterExtension(this.name);
        this.onclose();
      }
    };
    var CoreExtension = class {
      constructor(ext, peer, name, handlers) {
        this.extension = ext;
        this.peer = peer;
        this.name = name;
        this.alias = peer.alias;
        this.onmessage = handlers.onmessage || noop;
        this.onremotesupports = handlers.onremotesupports || noop;
      }
      get remoteSupports() {
        return this.extension.remoteSupports;
      }
      announce() {
        this.extension.announce();
      }
      send(message) {
        return this.extension._sendAlias(message, this.peer.alias);
      }
      destroy() {
        this.peer.extensions.delete(this.name);
        this.extension.peers.delete(this);
      }
    };
    var Peer = class {
      constructor(protocol, alias, key, discoveryKey, handlers, state) {
        this.protocol = protocol;
        this.handlers = handlers;
        this.key = key;
        this.discoveryKey = discoveryKey;
        this.alias = alias;
        this.remoteAlias = -1;
        this.resend = false;
        this.state = state;
        this.extensions = /* @__PURE__ */ new Map();
        this.uploading = true;
        this.downloading = true;
        this.destroyed = false;
        this._destroyer = this._safeDestroy.bind(this);
      }
      setUploading(uploading) {
        if (uploading === this.uploading)
          return;
        this.uploading = uploading;
        this._sendInfo();
      }
      setDownloading(downloading) {
        if (downloading === this.downloading)
          return;
        this.downloading = downloading;
        this._sendInfo();
      }
      _sendInfo() {
        this.info({
          length: this.handlers.core.tree.length,
          fork: this.handlers.core.tree.fork,
          uploading: this.uploading,
          downloading: this.downloading
        });
      }
      onmessage(type, state) {
        const handlers = this.handlers;
        switch (type) {
          case 4: {
            this._catch(handlers.oninfo(messages.info.decode(state), this));
            break;
          }
          case 5: {
            break;
          }
          case 6: {
            break;
          }
          case 7: {
            this._catch(handlers.onhave(messages.have.decode(state), this));
            break;
          }
          case 8: {
            this._catch(handlers.onbitfield(messages.bitfield.decode(state), this));
            break;
          }
          case 9: {
            this._catch(handlers.onrequest(messages.request.decode(state), this));
            break;
          }
          case 10: {
            this._catch(handlers.ondata(messages.data.decode(state), this));
            break;
          }
        }
        state.start = state.end;
      }
      _catch(p) {
        if (isPromise(p))
          p.then(noop, this._destroyer);
      }
      registerExtension(name, handlers) {
        if (this.extensions.has(name))
          return this.extensions.get(name);
        const ext = this.protocol.registerExtension(name, { aliased: true, encoding: handlers.encoding });
        const coreExt = new CoreExtension(ext, this, name, handlers);
        ext.peers.add(coreExt);
        this.extensions.set(name, coreExt);
        return coreExt;
      }
      cork() {
        this.protocol.cork();
      }
      uncork() {
        this.protocol.uncork();
      }
      info(message) {
        return this.protocol.send(4, messages.info, this.alias, message);
      }
      options(message) {
      }
      want(message) {
      }
      have(message) {
        return this.protocol.send(7, messages.have, this.alias, message);
      }
      bitfield(message) {
        return this.protocol.send(8, messages.bitfield, this.alias, message);
      }
      request(message) {
        return this.protocol.send(9, messages.request, this.alias, message);
      }
      data(message) {
        return this.protocol.send(10, messages.data, this.alias, message);
      }
      _safeDestroy(err) {
        safetyCatch(err);
        return this.destroy(err);
      }
      destroy(err) {
        this.destroyed = true;
        return this.protocol.unregisterPeer(this, err);
      }
    };
    module.exports = class Protocol {
      constructor(noiseStream, handlers = {}) {
        this.noiseStream = noiseStream;
        this.protocolVersion = handlers.protocolVersion || 0;
        this.userAgent = handlers.userAgent || "";
        this.remoteUserAgent = "";
        this.handlers = handlers;
        this._firstMessage = true;
        this._corks = 1;
        this._batch = [];
        this._localAliases = 0;
        this._remoteAliases = [];
        this._peers = /* @__PURE__ */ new Map();
        this._localExtensions = 128;
        this._remoteExtensions = [];
        this._extensions = /* @__PURE__ */ new Map();
        this._keepAliveInterval = null;
        this._pendingCaps = [];
        this._destroyer = this._safeDestroy.bind(this);
        this.noiseStream.on("data", this.onmessage.bind(this));
        this.noiseStream.on("end", this.noiseStream.end);
        this.noiseStream.on("finish", () => {
          this.setKeepAlive(false);
        });
        this.noiseStream.on("close", () => {
          this.setKeepAlive(false);
          for (const peer of this._peers.values()) {
            peer.destroy(null);
          }
        });
        this._sendHandshake();
      }
      setKeepAlive(enable) {
        if (enable) {
          if (this._keepAliveInterval)
            return;
          this._keepAliveInterval = setInterval(this.ping.bind(this), 5e3);
          if (this._keepAliveInterval.unref)
            this._keepAliveInterval.unref();
        } else {
          if (!this._keepAliveInterval)
            return;
          clearInterval(this._keepAliveInterval);
          this._keepAliveInterval = null;
        }
      }
      _sendHandshake() {
        const m = { protocolVersion: this.protocolVersion, userAgent: this.userAgent };
        const state = { start: 0, end: 0, buffer: null };
        messages.handshake.preencode(state, m);
        state.buffer = this.noiseStream.alloc(state.end);
        messages.handshake.encode(state, m);
        this.noiseStream.write(state.buffer);
      }
      isRegistered(discoveryKey) {
        return this._peers.has(discoveryKey.toString("hex"));
      }
      registerPeer(key, discoveryKey, handlers = {}, state = null) {
        const peer = new Peer(this, this._localAliases++, key, discoveryKey, handlers, state);
        this._peers.set(b4a.toString(discoveryKey, "hex"), peer);
        this._announceCore(peer.alias, key, discoveryKey);
        return peer;
      }
      unregisterPeer(peer, err) {
        this._peers.delete(b4a.toString(peer.discoveryKey, "hex"));
        if (peer.remoteAlias > -1) {
          this._remoteAliases[peer.remoteAlias] = null;
          peer.remoteAlias = -1;
        }
        peer.handlers.onunregister(peer, err);
        if (err)
          this.noiseStream.destroy(err);
      }
      registerExtension(name, handlers) {
        let ext = this._extensions.get(name);
        if (ext)
          return ext;
        ext = new Extension(this, this._localExtensions++, name, handlers);
        this._extensions.set(name, ext);
        return ext;
      }
      unregisterExtension(name) {
        const ext = this._extensions.get(name);
        if (!ext)
          return;
        if (!ext.destroyed)
          return ext.destroy();
        this._extensions.delete(name);
        this._remoteExtensions[ext.type - 128] = null;
      }
      cork() {
        if (++this._corks === 1)
          this._batch = [];
      }
      uncork() {
        if (--this._corks > 0)
          return;
        const batch = this._batch;
        this._batch = null;
        if (batch.length === 0)
          return;
        while (this._pendingCaps.length > 0) {
          const [key, cap] = this._pendingCaps.pop();
          hypercoreCapability(this.noiseStream.isInitiator, this.noiseStream.handshakeHash, key, cap);
        }
        const state = { start: 0, end: 0, buffer: null };
        const lens = new Array(batch.length);
        uint.preencode(state, 0);
        for (let i = 0; i < batch.length; i++) {
          const [type, enc, dk, message] = batch[i];
          const start = state.end;
          uint.preencode(state, type);
          if (dk > -1)
            uint.preencode(state, dk);
          enc.preencode(state, message);
          uint.preencode(state, lens[i] = state.end - start);
        }
        state.buffer = this.noiseStream.alloc(state.end);
        uint.encode(state, 0);
        for (let i = 0; i < batch.length; i++) {
          const [type, enc, dk, message] = batch[i];
          uint.encode(state, lens[i]);
          uint.encode(state, type);
          if (dk > -1)
            uint.encode(state, dk);
          enc.encode(state, message);
        }
        this.noiseStream.write(state.buffer);
      }
      onmessage(message) {
        try {
          this._decode(message);
        } catch (err) {
          this._safeDestroy(err);
        }
      }
      _catch(p) {
        if (isPromise(p))
          p.then(noop, this._destroyer);
      }
      _announceCore(alias, key, discoveryKey) {
        const cap = b4a.alloc(32);
        if (!this.noiseStream.handshakeHash) {
          this._pendingCaps.push([key, cap]);
        } else {
          hypercoreCapability(this.noiseStream.isInitiator, this.noiseStream.handshakeHash, key, cap);
        }
        this.send(2, messages.core, -1, {
          alias,
          discoveryKey,
          capability: cap
        });
      }
      _decode(buffer) {
        if (buffer.byteLength === 0)
          return;
        const state = { start: 0, end: buffer.length, buffer };
        if (this._firstMessage === true) {
          this._firstMessage = false;
          const { userAgent } = messages.handshake.decode(state);
          this.remoteUserAgent = userAgent;
          this.uncork();
          return;
        }
        const type = uint.decode(state);
        if (type === 0) {
          while (state.start < state.end) {
            const len = uint.decode(state);
            state.end = state.start + len;
            const type2 = uint.decode(state);
            this._decodeMessage(type2, state);
            state.end = buffer.length;
          }
        } else {
          this._decodeMessage(type, state);
        }
      }
      _decodeMessage(type, state) {
        switch (type) {
          case 1:
            return this._onextension(messages.extension.decode(state));
          case 2:
            return this._oncore(messages.core.decode(state));
          case 3:
            return this._onunknowncore(messages.unknownCore.decode(state));
        }
        if (type < 11) {
          const remoteAlias = uint.decode(state);
          const peer = this._remoteAliases[remoteAlias];
          if (peer)
            peer.onmessage(type, state);
        } else if (type >= 128) {
          const ext = this._remoteExtensions[type - 128];
          if (ext)
            ext._onmessage(state);
        }
        state.start = state.end;
      }
      _onextension(m) {
        const type = m.alias - 128;
        const ext = this._extensions.get(m.name);
        if (type === this._remoteExtensions.length) {
          this._remoteExtensions.push(null);
        }
        if (!ext)
          return;
        if (type < 0 || type >= this._remoteExtensions.length) {
          this.destroy(new Error("Remote alias out of bounds"));
          return;
        }
        this._remoteExtensions[type] = ext;
        if (!ext.remoteSupports)
          ext._onremotesupports();
      }
      _oncore(m) {
        const hex = b4a.toString(m.discoveryKey, "hex");
        const peer = this._peers.get(hex);
        if (m.alias === this._remoteAliases.length)
          this._remoteAliases.push(null);
        if (peer) {
          const expectedCap = hypercoreCapability(!this.noiseStream.isInitiator, this.noiseStream.handshakeHash, peer.key);
          if (!b4a.equals(expectedCap, m.capability)) {
            this.destroy(new Error("Remote sent an invalid capability"));
            return;
          }
          if (m.alias >= this._remoteAliases.length) {
            this.destroy(new Error("Remote alias out of bounds"));
            return;
          }
          this._remoteAliases[m.alias] = peer;
          peer.remoteAlias = m.alias;
          if (peer.resend)
            this._announceCore(peer.alias, peer.key, peer.discoveryKey);
          this._catch(peer.handlers.oncore(m, peer));
          return;
        }
        const self2 = this;
        const p = this.handlers.ondiscoverykey ? this.handlers.ondiscoverykey(m.discoveryKey) : void 0;
        if (isPromise(p))
          p.then(next, next);
        else
          next();
        function next() {
          if (self2._peers.has(hex))
            return self2._oncore(m);
          self2.send(3, messages.unknownCore, -1, { discoveryKey: m.discoveryKey });
        }
      }
      _onunknowncore(m) {
        const peer = this._peers.get(b4a.toString(m.discoveryKey, "hex"));
        if (!peer)
          return;
        peer.resend = true;
        this._catch(peer.handlers.onunknowncore(m, peer));
      }
      send(type, enc, dk, message) {
        if (this._corks > 0) {
          this._batch.push([type, enc, dk, message]);
          return false;
        }
        const state = { start: 0, end: 0, buffer: null };
        uint.preencode(state, type);
        if (dk > -1)
          uint.preencode(state, dk);
        enc.preencode(state, message);
        state.buffer = this.noiseStream.alloc(state.end);
        uint.encode(state, type);
        if (dk > -1)
          uint.encode(state, dk);
        enc.encode(state, message);
        return this.noiseStream.write(state.buffer);
      }
      ping() {
        const empty = this.noiseStream.alloc(0);
        this.noiseStream.write(empty);
      }
      destroy(err) {
        return this.noiseStream.destroy(err);
      }
      _safeDestroy(err) {
        safetyCatch(err);
        this.destroy(err);
      }
    };
    function noop() {
    }
    function isPromise(p) {
      return !!p && typeof p.then === "function";
    }
    function hypercoreCapability(initiator, handshakeHash, key, cap = b4a.alloc(32)) {
      const ns = initiator ? NS_HYPERCORE_INITIATOR : NS_HYPERCORE_RESPONDER;
      sodium.crypto_generichash_batch(cap, [handshakeHash, key], ns);
      return cap;
    }
  }
});

// node_modules/big-sparse-array/index.js
var require_big_sparse_array = __commonJS({
  "node_modules/big-sparse-array/index.js"(exports, module) {
    init_node_globals();
    var FACTOR = new Uint16Array(8);
    function factor4096(i, n) {
      while (n > 0) {
        const f = i & 4095;
        FACTOR[--n] = f;
        i = (i - f) / 4096;
      }
      return FACTOR;
    }
    module.exports = class BigSparseArray {
      constructor() {
        this.tiny = new TinyArray();
        this.maxLength = 4096;
        this.factor = 1;
      }
      set(index, val2) {
        if (val2 !== void 0) {
          while (index >= this.maxLength) {
            this.maxLength *= 4096;
            this.factor++;
            if (!this.tiny.isEmptyish()) {
              const t = new TinyArray();
              t.set(0, this.tiny);
              this.tiny = t;
            }
          }
        }
        const f = factor4096(index, this.factor);
        const last = this.factor - 1;
        let tiny = this.tiny;
        for (let i = 0; i < last; i++) {
          const next = tiny.get(f[i]);
          if (next === void 0) {
            if (val2 === void 0)
              return;
            tiny = tiny.set(f[i], new TinyArray());
          } else {
            tiny = next;
          }
        }
        return tiny.set(f[last], val2);
      }
      get(index) {
        const f = factor4096(index, this.factor);
        const last = this.factor - 1;
        let tiny = this.tiny;
        for (let i = 0; i < last; i++) {
          tiny = tiny.get(f[i]);
          if (tiny === void 0)
            return;
        }
        return tiny.get(f[last]);
      }
    };
    var TinyArray = class {
      constructor() {
        this.s = 0;
        this.b = new Array(1);
        this.f = new Uint16Array(1);
      }
      isEmptyish() {
        return this.b.length === 1 && this.b[0] === void 0;
      }
      get(i) {
        if (this.s === 12)
          return this.b[i];
        const f = i >>> this.s;
        const r = i & this.b.length - 1;
        return this.f[r] === f ? this.b[r] : void 0;
      }
      set(i, v) {
        while (this.s !== 12) {
          const f = i >>> this.s;
          const r = i & this.b.length - 1;
          const o = this.b[r];
          if (o === void 0 || f === this.f[r]) {
            this.b[r] = v;
            this.f[r] = f;
            return v;
          }
          this.grow();
        }
        this.b[i] = v;
        return v;
      }
      grow() {
        const os = this.s;
        const ob = this.b;
        const of = this.f;
        this.s += 4;
        this.b = new Array(this.b.length << 4);
        this.f = this.s === 12 ? null : new Uint8Array(this.b.length);
        const m = this.b.length - 1;
        for (let or = 0; or < ob.length; or++) {
          if (ob[or] === void 0)
            continue;
          const i = of[or] << os | or;
          const f = i >>> this.s;
          const r = i & m;
          this.b[r] = ob[or];
          if (this.s !== 12)
            this.f[r] = f;
        }
      }
    };
  }
});

// node_modules/hypercore/lib/remote-bitfield.js
var require_remote_bitfield = __commonJS({
  "node_modules/hypercore/lib/remote-bitfield.js"(exports, module) {
    init_node_globals();
    var BigSparseArray = require_big_sparse_array();
    module.exports = class RemoteBitfield {
      constructor() {
        this.pages = new BigSparseArray();
      }
      get(index) {
        const r = index & 32767;
        const i = (index - r) / 32768;
        const p = this.pages.get(i);
        return p ? (p[r >>> 5] & 1 << (r & 31)) !== 0 : false;
      }
      set(index, val2) {
        const r = index & 32767;
        const i = (index - r) / 32768;
        const p = this.pages.get(i) || this.pages.set(i, new Uint32Array(1024));
        if (val2)
          p[r >>> 5] |= 1 << (r & 31);
        else
          p[r >>> 5] &= ~(1 << (r & 31));
      }
    };
  }
});

// node_modules/random-array-iterator/index.js
var require_random_array_iterator = __commonJS({
  "node_modules/random-array-iterator/index.js"(exports, module) {
    init_node_globals();
    module.exports = class RandomArrayIterator {
      constructor(values) {
        this.values = values;
        this.start = 0;
        this.length = this.values.length;
      }
      next() {
        if (this.length === 0) {
          if (this.start === 0)
            return { done: true, value: void 0 };
          this.length = this.start;
          this.start = 0;
        }
        const i = this.start + (Math.random() * this.length | 0);
        const j = this.start + --this.length;
        const value = this.values[i];
        this.values[i] = this.values[j];
        this.values[j] = value;
        return { done: false, value };
      }
      dequeue() {
        this.values[this.start + this.length] = this.values[this.values.length - 1];
        this.values.pop();
      }
      requeue() {
        const i = this.start + this.length;
        const value = this.values[i];
        this.values[i] = this.values[this.start];
        this.values[this.start++] = value;
      }
      restart() {
        this.start = 0;
        this.length = this.values.length;
        return this;
      }
      [Symbol.iterator]() {
        return this;
      }
    };
  }
});

// node_modules/hypercore/package.json
var require_package = __commonJS({
  "node_modules/hypercore/package.json"(exports, module) {
    module.exports = {
      name: "hypercore",
      version: "10.0.0-alpha.24",
      description: "Hypercore 10",
      main: "index.js",
      scripts: {
        test: "standard && brittle test/*.js"
      },
      repository: {
        type: "git",
        url: "git+https://github.com/hypercore-protocol/hypercore.git"
      },
      contributors: [
        {
          name: "Mathias Buus",
          email: "mathiasbuus@gmail.com",
          url: "https://mafinto.sh"
        },
        {
          name: "Andrew Osheroff",
          email: "andrewosh@gmail.com",
          url: "https://andrewosh.com"
        }
      ],
      license: "MIT",
      bugs: {
        url: "https://github.com/hypercore-protocol/hypercore/issues"
      },
      homepage: "https://github.com/hypercore-protocol/hypercore#readme",
      files: [
        "index.js",
        "lib/**.js"
      ],
      dependencies: {
        "@hyperswarm/secret-stream": "^5.0.0",
        b4a: "^1.1.0",
        "big-sparse-array": "^1.0.2",
        codecs: "^3.0.0",
        "compact-encoding": "^2.5.0",
        "crc32-universal": "^1.0.1",
        events: "^3.3.0",
        "flat-tree": "^1.9.0",
        "hypercore-crypto": "^3.1.0",
        "is-options": "^1.0.1",
        "random-access-file": "^2.1.4",
        "random-array-iterator": "^1.0.0",
        "safety-catch": "^1.0.1",
        "sodium-universal": "^3.0.4",
        xache: "^1.0.0"
      },
      devDependencies: {
        brittle: "^2.0.0",
        hyperswarm: "next",
        "random-access-memory": "^3.1.2",
        standard: "^16.0.3",
        "tmp-promise": "^3.0.2"
      },
      optionalDependencies: {
        fsctl: "^1.0.0"
      }
    };
  }
});

// node_modules/hypercore/lib/replicator.js
var require_replicator = __commonJS({
  "node_modules/hypercore/lib/replicator.js"(exports, module) {
    init_node_globals();
    var Protocol = require_protocol();
    var RemoteBitfield = require_remote_bitfield();
    var RandomIterator = require_random_array_iterator();
    var b4a = require_browser2();
    var PKG = require_package();
    var USER_AGENT = PKG.name + "/" + PKG.version + "@nodejs";
    var RemoteState = class {
      constructor(core) {
        this.receivedInfo = false;
        this.inflight = 0;
        this.maxInflight = 16;
        this.bitfield = new RemoteBitfield();
        this.length = 0;
        this.fork = 0;
        this.uploading = true;
        this.downloading = true;
      }
    };
    var InvertedPromise = class {
      constructor(resolve, reject, index) {
        this.index = index;
        this.resolve = resolve;
        this.reject = reject;
      }
    };
    var Request = class {
      constructor(index, seek, nodes) {
        this.peer = null;
        this.index = index;
        this.seek = seek;
        this.value = seek === 0;
        this.nodes = nodes;
        this.promises = [];
      }
      createPromise() {
        return new Promise((resolve, reject) => {
          this.promises.push(new InvertedPromise(resolve, reject, this.promises.length));
        });
      }
      resolve(val2) {
        for (let i = 0; i < this.promises.length; i++) {
          this.promises[i].resolve(val2);
        }
      }
      reject(err) {
        for (let i = 0; i < this.promises.length; i++) {
          this.promises[i].reject(err);
        }
      }
    };
    var Upgrade = class {
      constructor(minLength) {
        this.minLength = minLength;
        this.promises = [];
      }
      update(peers, fork) {
        for (const peer of peers) {
          if (peer.state.length >= this.minLength && !paused(peer, fork))
            return true;
          if (!peer.state.receivedInfo)
            return true;
        }
        return false;
      }
      createPromise() {
        return new Promise((resolve, reject) => {
          this.promises.push(new InvertedPromise(resolve, reject, this.promises.length));
        });
      }
      resolve(val2) {
        for (let i = 0; i < this.promises.length; i++) {
          this.promises[i].resolve(val2);
        }
      }
      reject(err) {
        for (let i = 0; i < this.promises.length; i++) {
          this.promises[i].reject(err);
        }
      }
    };
    var UpgradeLock = class {
      constructor(peer, length) {
        this.peer = peer;
        this.length = length;
        this.resolve = null;
        this.promise = new Promise((resolve) => {
          this.resolve = resolve;
        });
      }
    };
    var Seek = class {
      constructor(seeker) {
        this.request = null;
        this.seeker = seeker;
        this.promise = null;
        this.finished = false;
      }
      async update() {
        const res = await this.seeker.update();
        if (!res)
          return false;
        this.finished = true;
        this.promise.resolve(res);
        return true;
      }
      createPromise() {
        return new Promise((resolve, reject) => {
          this.promise = new InvertedPromise(resolve, reject, 0);
        });
      }
    };
    var Range = class {
      constructor(start, end, filter, linear) {
        this.start = start;
        this.end = end;
        this.filter = filter;
        this.linear = !!linear;
        this.promise = null;
        this.done = false;
        this._inv = null;
        this._start = start;
        this._ranges = null;
        this._resolved = false;
        this._error = null;
      }
      contains(req) {
        return this._start <= req.index && req.index < this.end;
      }
      update(bitfield) {
        if (this.end === -1) {
          while (bitfield.get(this._start))
            this._start++;
          return false;
        }
        for (; this._start < this.end; this._start++) {
          if (this.filter(this._start) && !bitfield.get(this._start))
            return false;
        }
        return true;
      }
      resolve(done) {
        this._done(null, done);
      }
      destroy(err) {
        this._done(err, false);
      }
      downloaded() {
        if (this.promise)
          return this.promise;
        if (!this.done)
          return this._makePromise();
        if (this._error !== null)
          return Promise.reject(this._error);
        return Promise.resolve(this._resolved);
      }
      _done(err, done) {
        if (this.done)
          return;
        this.done = true;
        if (this._ranges) {
          const i = this._ranges.indexOf(this);
          if (i === this._ranges.length - 1)
            this._ranges.pop();
          else if (i > -1)
            this._ranges[i] = this._ranges.pop();
        }
        this._ranges = null;
        this._resolved = done;
        this._error = err;
        if (this._inv === null)
          return;
        if (err)
          this._inv.reject(err);
        else
          this._inv.resolve(done);
      }
      _makePromise() {
        this.promise = new Promise((resolve, reject) => {
          this._inv = new InvertedPromise(resolve, reject, 0);
        });
        return this.promise;
      }
    };
    var RequestPool = class {
      constructor(replicator, core) {
        this.replicator = replicator;
        this.core = core;
        this.pending = [];
        this.seeks = [];
        this.ranges = [];
        this.requests = /* @__PURE__ */ new Map();
        this.upgrading = null;
        this.unforking = null;
        this.eagerUpgrades = true;
        this.paused = false;
      }
      clear(peer) {
        peer.state.inflight = 0;
        for (const seek of this.seeks) {
          if (seek.request && seek.request.peer === peer) {
            seek.request = null;
          }
        }
        for (const req of this.requests.values()) {
          if (req.peer === peer) {
            req.peer = null;
            this.pending.push(req);
          }
        }
        if (this.upgrading && this.upgrading.peer === peer) {
          this.upgrading.resolve();
          this.upgrading = null;
        }
      }
      isRequesting(index) {
        return this.requests.has(index);
      }
      update(peer) {
        if (peer.state.inflight >= peer.state.maxInflight)
          return false;
        if (peer.downloading === false || peer.state.uploading === false)
          return false;
        if (this.paused)
          return false;
        if (peer.state.fork > this.core.tree.fork) {
          return true;
        }
        for (const seek of this.seeks) {
          if (this._updateSeek(peer, seek))
            return true;
        }
        if (this.pendingUpgrade) {
          if (this._updateUpgrade(peer))
            return true;
        }
        const pending = new RandomIterator(this.pending);
        for (const req of pending) {
          if (this._updatePeer(peer, req)) {
            pending.dequeue();
            return true;
          }
        }
        const ranges = new RandomIterator(this.ranges);
        for (const range of ranges) {
          if (this._updateRange(peer, range))
            return true;
        }
        if (this.eagerUpgrades && !this.upgrading) {
          return this._updateUpgrade(peer);
        }
        return false;
      }
      _updateSeek(peer, seek) {
        if (seek.request)
          return false;
        const nodes = log2(seek.seeker.end - seek.seeker.start);
        seek.request = this._requestRange(peer, seek.seeker.start, seek.seeker.end, seek.seeker.bytes, nodes);
        return seek.request !== null;
      }
      _updatePeer(peer, req) {
        const remote = peer.state.bitfield;
        const local = this.core.bitfield;
        if (!remote.get(req.index) || local.get(req.index))
          return false;
        this.send(peer, req);
        return true;
      }
      _updateRange(peer, range) {
        const end = range.end === -1 ? peer.state.length : range.end;
        if (end <= range._start)
          return false;
        if (range.linear)
          return !!this._requestRange(peer, range._start, end, 0, 0, range.filter);
        const r = range._start + Math.floor(Math.random() * (end - range._start));
        return !!(this._requestRange(peer, r, end, 0, 0, range.filter) || this._requestRange(peer, range._start, r, 0, 0, range.filter));
      }
      _updateUpgrade(peer) {
        const minLength = this.pendingUpgrade ? this.pendingUpgrade.minLength : this.core.tree.length + 1;
        if (this.upgrading || peer.state.length < minLength)
          return false;
        this.upgrading = new UpgradeLock(peer, peer.state.length);
        const data = {
          fork: this.core.tree.fork,
          seek: null,
          block: null,
          upgrade: { start: this.core.tree.length, length: peer.state.length - this.core.tree.length }
        };
        peer.request(data);
        return true;
      }
      checkTimeouts(peers) {
        if (!this.pendingUpgrade || this.upgrading)
          return;
        if (this.pendingUpgrade.update(peers, this.core.tree.fork))
          return;
        this.pendingUpgrade.resolve(false);
        this.pendingUpgrade = null;
      }
      _requestRange(peer, start, end, seek, nodes, filter = tautology) {
        const remote = peer.state.bitfield;
        const local = this.core.bitfield;
        if (end === -1)
          end = peer.state.length;
        for (let i = start; i < end; i++) {
          if (!filter(i) || !remote.get(i) || local.get(i))
            continue;
          if (this.requests.has(i))
            continue;
          const req = new Request(i, i < this.core.tree.length ? seek : 0, nodes);
          this.requests.set(i, req);
          this.send(peer, req);
          return req;
        }
        return null;
      }
      async send(peer, req) {
        req.peer = peer;
        peer.state.inflight++;
        let needsUpgrade = peer.state.length > this.core.tree.length || !!(!this.upgrading && this.pendingUpgrade);
        const fork = this.core.tree.fork;
        let upgrading = false;
        while (needsUpgrade) {
          if (!this.upgrading) {
            if (peer.state.length <= this.core.tree.length) {
              needsUpgrade = false;
              break;
            }
            this.upgrading = new UpgradeLock(peer, peer.state.length);
            upgrading = true;
            break;
          }
          if (req.index < this.core.tree.length) {
            needsUpgrade = false;
            break;
          }
          await this.upgrading.promise;
          needsUpgrade = peer.state.length > this.core.tree.length || !!(!this.upgrading && this.pendingUpgrade);
        }
        const data = {
          fork,
          seek: req.seek ? { bytes: req.seek } : null,
          block: { index: req.index, value: req.value, nodes: 0 },
          upgrade: needsUpgrade ? { start: this.core.tree.length, length: peer.state.length - this.core.tree.length } : null
        };
        if (data.block.index < this.core.tree.length || this.core.truncating > 0) {
          try {
            data.block.nodes = Math.max(req.nodes, await this.core.tree.nodes(data.block.index * 2));
          } catch (err) {
            console.error("TODO handle me:", err.stack);
          }
        }
        if (peer.destroyed) {
          req.peer = null;
          this.pending.push(req);
          if (upgrading) {
            this.upgrading.resolve();
            this.upgrading = null;
          }
          this.replicator.updateAll();
          return;
        }
        if (fork !== this.core.tree.fork || paused(peer, this.core.tree.fork) || this.core.truncating > 0) {
          if (peer.state.inflight > 0)
            peer.state.inflight--;
          if (req.promises.length) {
            req.peer = null;
            this.pending.push(req);
          } else {
            this.requests.delete(req.index);
          }
          if (upgrading) {
            this.upgrading.resolve();
            this.upgrading = null;
          }
          return;
        }
        peer.request(data);
      }
      async _onupgrade(proof, peer) {
        if (!this.upgrading || !proof.upgrade)
          return;
        if (this.unforking)
          return;
        await this.core.verify(proof, peer);
        this.upgrading.resolve();
        this.upgrading = null;
        if (this.pendingUpgrade) {
          this.pendingUpgrade.resolve(true);
          this.pendingUpgrade = null;
        }
        if (this.seeks.length)
          await this._updateSeeks(null);
        this.update(peer);
      }
      async _onfork(proof, peer) {
        if (this.unforking) {
          await this.unforking.update(proof);
        } else {
          const reorg2 = await this.core.tree.reorg(proof);
          const verified = reorg2.signedBy(this.core.header.signer.publicKey);
          if (!verified)
            throw new Error("Remote signature could not be verified");
          this.unforking = reorg2;
        }
        if (!this.unforking.finished) {
          for (let i = this.unforking.want.start; i < this.unforking.want.end; i++) {
            if (peer.state.bitfield.get(i)) {
              const data = {
                fork: this.unforking.fork,
                seek: null,
                block: { index: i, value: false, nodes: this.unforking.want.nodes },
                upgrade: null
              };
              peer.request(data);
              return;
            }
          }
          return;
        }
        const reorg = this.unforking;
        this.unforking = null;
        await this.core.reorg(reorg);
        for (const r of this.ranges) {
          r._start = 0;
        }
        this.replicator.updateAll();
      }
      async ondata(proof, peer) {
        if (peer.state.inflight > 0)
          peer.state.inflight--;
        if (peer.state.fork !== this.core.tree.fork) {
          if (peer.state.fork > this.core.tree.fork)
            return this._onfork(proof, peer);
          return;
        }
        if (this.unforking)
          return;
        if (!proof.block)
          return this._onupgrade(proof, peer);
        const { index, value } = proof.block;
        const req = this.requests.get(index);
        if (!req || req.peer !== peer || value && !req.value || proof.upgrade && !this.upgrading)
          return;
        try {
          await this.core.verify(proof, peer);
        } catch (err) {
          this.requests.delete(index);
          throw err;
        }
        if (proof.upgrade) {
          this.upgrading.resolve();
          this.upgrading = null;
          if (this.pendingUpgrade) {
            this.pendingUpgrade.resolve(true);
            this.pendingUpgrade = null;
          }
        }
        await this._resolveRequest(req, index, value);
        this.update(peer);
      }
      async _resolveRequest(req, index, value) {
        const resolved = req.value === !!value;
        if (resolved) {
          this.requests.delete(index);
          req.resolve(value);
        }
        if (this.seeks.length)
          await this._updateSeeks(req);
        for (let i = 0; i < this.ranges.length; i++) {
          const r = this.ranges[i];
          if (!r.contains(req))
            continue;
          if (!r.update(this.core.bitfield))
            continue;
          r.resolve(true);
          i--;
        }
      }
      async _updateSeeks(req) {
        for (let i = 0; i < this.seeks.length; i++) {
          await this.seeks[i].update();
        }
        for (let i = 0; i < this.seeks.length; i++) {
          const seek = this.seeks[i];
          if (seek.finished) {
            if (this.seeks.length > 1 && i < this.seeks.length - 1) {
              this.seeks[i] = this.seeks[this.seeks.length - 1];
              i--;
            }
            this.seeks.pop();
          }
          if (req !== null && seek.request === req)
            seek.request = null;
        }
      }
      async resolveBlock(index, value) {
        const req = this.requests.get(index);
        if (req)
          await this._resolveRequest(req, index, value);
      }
      upgrade() {
        if (this.pendingUpgrade)
          return this.pendingUpgrade.createPromise();
        this.pendingUpgrade = new Upgrade(this.core.tree.length + 1);
        return this.pendingUpgrade.createPromise();
      }
      range(range) {
        if (range.ranges === null || this.ranges.index(range) > -1)
          return;
        this.ranges.push(range);
        range.ranges = range;
      }
      seek(seeker) {
        const s = new Seek(seeker);
        this.seeks.push(s);
        return s.createPromise();
      }
      block(index) {
        const e = this.requests.get(index);
        if (e) {
          if (!e.value) {
            e.value = true;
            if (e.peer)
              this.send(e.peer, e);
          }
          return e.createPromise();
        }
        const r = new Request(index, 0, 0);
        this.requests.set(index, r);
        this.pending.push(r);
        return r.createPromise();
      }
    };
    module.exports = class Replicator {
      constructor(core, { onupdate, onupload }) {
        this.core = core;
        this.peers = [];
        this.requests = new RequestPool(this, core);
        this.updating = null;
        this.pendingPeers = /* @__PURE__ */ new Set();
        this.onupdate = onupdate;
        this.onupload = onupload;
      }
      static createProtocol(noiseStream, opts) {
        return new Protocol(noiseStream, {
          ...opts,
          protocolVersion: 0,
          userAgent: USER_AGENT
        });
      }
      joinProtocol(protocol, key, discoveryKey) {
        if (protocol.isRegistered(discoveryKey))
          return;
        const peer = protocol.registerPeer(key, discoveryKey, this, new RemoteState(this.core));
        this.pendingPeers.add(peer);
      }
      broadcastBlock(start) {
        const msg = { start, length: 1 };
        for (const peer of this.peers)
          peer.have(msg);
        if (this.requests.isRequesting(start)) {
          this._resolveBlock(start).then(noop, noop);
        }
      }
      broadcastInfo() {
        for (const peer of this.peers) {
          peer.info({
            length: this.core.tree.length,
            fork: this.core.tree.fork,
            uploading: peer.uploading,
            downloading: peer.downloading
          });
        }
        this.updateAll();
      }
      requestUpgrade() {
        const promise = this.requests.upgrade();
        this.updateAll();
        return promise;
      }
      requestSeek(seeker) {
        if (typeof seeker === "number")
          seeker = this.core.tree.seek(seeker);
        const promise = this.requests.seek(seeker);
        this.updateAll();
        return promise;
      }
      requestBlock(index) {
        const promise = this.requests.block(index);
        this.updateAll();
        return promise;
      }
      static createRange(start, end, filter, linear) {
        if (filter === void 0) {
          filter = tautology;
        } else if (typeof filter === "boolean") {
          linear = filter;
          filter = tautology;
        }
        return new Range(start, end, filter, linear);
      }
      addRange(range) {
        if (!range.done) {
          range._ranges = this.requests.ranges;
          this.requests.ranges.push(range);
          if (range.update(this.core.bitfield))
            range.resolve(true);
        }
        this.updateAll();
      }
      async _resolveBlock(index) {
        const value = await this.core.blocks.get(index);
        this.requests.resolveBlock(index, value);
      }
      updateAll() {
        const peers = new RandomIterator(this.peers);
        for (const peer of peers) {
          if (paused(peer, this.core.tree.fork))
            continue;
          if (this.requests.update(peer))
            peers.requeue();
        }
        if (this.pendingPeers.size === 0)
          this.requests.checkTimeouts(this.peers);
      }
      onunregister(peer, err) {
        const idx = this.peers.indexOf(peer);
        if (idx === -1)
          return;
        this.pendingPeers.delete(peer);
        this.peers.splice(idx, 1);
        this.requests.clear(peer);
        this.onupdate(false, peer);
        this.updateAll();
      }
      oncore(_, peer) {
        this.pendingPeers.delete(peer);
        this.peers.push(peer);
        this.onupdate(true, peer);
        peer.info({
          length: this.core.tree.length,
          fork: this.core.tree.fork,
          uploading: peer.uploading,
          downloading: peer.downloading
        });
        const p = pages(this.core);
        for (let index = 0; index < p.length; index++) {
          peer.bitfield({ start: index, bitfield: p[index] });
        }
      }
      onunknowncore(_, peer) {
        this.pendingPeers.delete(peer);
        this.updateAll();
      }
      oninfo({ length, fork, uploading, downloading }, peer) {
        const len = peer.state.length;
        const forked = peer.state.fork !== fork;
        peer.state.length = length;
        peer.state.fork = fork;
        peer.state.downloading = downloading;
        peer.state.uploading = uploading;
        if (forked) {
          for (let i = peer.state.length; i < len; i++) {
            peer.state.bitfield.set(i, false);
          }
          if (fork > this.core.tree.fork && length > 0) {
            this.requests.clear(peer);
            peer.request({ fork, upgrade: { start: 0, length } });
          }
        }
        if (!peer.state.receivedInfo) {
          peer.state.receivedInfo = true;
        }
        this.updateAll();
      }
      onbitfield({ start, bitfield }, peer) {
        if (bitfield.length < 1024) {
          const buf = b4a.from(bitfield.buffer, bitfield.byteOffset, bitfield.byteLength);
          const bigger = b4a.concat([buf, b4a.alloc(4096 - buf.length)]);
          bitfield = new Uint32Array(bigger.buffer, bigger.byteOffset, 1024);
        }
        peer.state.bitfield.pages.set(start, bitfield);
        this.updateAll();
      }
      onhave({ start, length }, peer) {
        const end = start + length;
        for (; start < end; start++) {
          peer.state.bitfield.set(start, true);
        }
        this.updateAll();
      }
      async ondata(proof, peer) {
        try {
          await this.requests.ondata(proof, peer);
        } catch (err) {
          this.updateAll();
          throw err;
        }
      }
      async onrequest(req, peer) {
        const fork = req.fork || peer.state.fork;
        if (fork !== this.core.tree.fork)
          return;
        if (!peer.uploading)
          return;
        const proof = await this.core.tree.proof(req);
        if (req.block && req.block.value) {
          proof.block.value = await this.core.blocks.get(req.block.index);
          this.onupload(req.block.index, proof.block.value, peer);
        }
        peer.data(proof);
      }
    };
    function paused(peer, fork) {
      return peer.state.fork !== fork;
    }
    function pages(core) {
      const res = [];
      for (let i = 0; i < core.tree.length; i += core.bitfield.pageSize) {
        const p = core.bitfield.page(i / core.bitfield.pageSize);
        res.push(p);
      }
      return res;
    }
    function noop() {
    }
    function tautology() {
      return true;
    }
    function log2(n) {
      let res = 1;
      while (n > 2) {
        n /= 2;
        res++;
      }
      return res;
    }
  }
});

// node_modules/hypercore/lib/extensions.js
var require_extensions = __commonJS({
  "node_modules/hypercore/lib/extensions.js"(exports, module) {
    init_node_globals();
    var Extension = class {
      constructor(extensions, name, handlers) {
        this.extensions = extensions;
        this.name = name;
        this.encoding = handlers.encoding;
        this.destroyed = false;
        this.onmessage = (handlers.onmessage || noop).bind(handlers);
        this.onremotesupports = (handlers.onremotesupports || noop).bind(handlers);
      }
      send(message, peer) {
        if (this.destroyed)
          return;
        const ext = peer.extensions.get(this.name);
        if (ext)
          ext.send(message);
      }
      broadcast(message) {
        if (this.extensions.replicator === null || this.destroyed)
          return;
        for (const peer of this.extensions.replicator.peers)
          this.send(message, peer);
      }
      destroy() {
        if (this.destroyed)
          return;
        this.destroyed = true;
        this.extensions.all.delete(this.name);
        if (this.extensions.replicator === null)
          return;
        for (const peer of this.extensions.replicator.peers) {
          const ext = peer.extensions.get(this.name);
          if (ext)
            ext.destroy();
        }
      }
    };
    module.exports = class Extensions {
      constructor() {
        this.replicator = null;
        this.all = /* @__PURE__ */ new Map();
      }
      [Symbol.iterator]() {
        return this.all[Symbol.iterator]();
      }
      attach(replicator) {
        if (replicator === this.replicator)
          return;
        this.replicator = replicator;
        for (const [name, ext] of this.all) {
          for (const peer of this.replicator.peers) {
            peer.registerExtension(name, ext);
          }
        }
      }
      register(name, handlers, ext = new Extension(this, name, handlers)) {
        if (this.all.has(name))
          this.all.get(name).destroy();
        this.all.set(name, ext);
        if (this.replicator !== null) {
          for (const peer of this.replicator.peers) {
            peer.registerExtension(name, ext);
          }
        }
        return ext;
      }
      update(peer) {
        for (const ext of this.all.values()) {
          peer.registerExtension(ext.name, ext);
        }
      }
    };
    function noop() {
    }
  }
});

// node_modules/crc32-universal/crc32.js
var require_crc32 = __commonJS({
  "node_modules/crc32-universal/crc32.js"(exports, module) {
    init_node_globals();
    module.exports = crc32;
    var crct = new Int32Array(4096);
    for (let i = 0; i < 256; ++i) {
      let c = i;
      let k = 9;
      while (--k)
        c = (c & 1 && -306674912) ^ c >>> 1;
      crct[i] = c;
    }
    for (let i = 0; i < 256; ++i) {
      let lv = crct[i];
      for (let j = 256; j < 4096; j += 256)
        lv = crct[i | j] = lv >>> 8 ^ crct[lv & 255];
    }
    var crcts = [];
    for (let i = 0; i < 16; )
      crcts[i] = crct.subarray(i << 8, ++i << 8);
    var [
      t1,
      t2,
      t3,
      t4,
      t5,
      t6,
      t7,
      t8,
      t9,
      t10,
      t11,
      t12,
      t13,
      t14,
      t15,
      t16
    ] = crcts;
    function crc32(d) {
      let c = -1;
      let i = 0;
      const max = d.length - 16;
      for (; i < max; ) {
        c = t16[d[i++] ^ c & 255] ^ t15[d[i++] ^ c >> 8 & 255] ^ t14[d[i++] ^ c >> 16 & 255] ^ t13[d[i++] ^ c >>> 24] ^ t12[d[i++]] ^ t11[d[i++]] ^ t10[d[i++]] ^ t9[d[i++]] ^ t8[d[i++]] ^ t7[d[i++]] ^ t6[d[i++]] ^ t5[d[i++]] ^ t4[d[i++]] ^ t3[d[i++]] ^ t2[d[i++]] ^ t1[d[i++]];
      }
      for (; i < d.length; ++i)
        c = t1[c & 255 ^ d[i]] ^ c >>> 8;
      return ~c >>> 0;
    }
  }
});

// node_modules/hypercore/lib/oplog.js
var require_oplog = __commonJS({
  "node_modules/hypercore/lib/oplog.js"(exports, module) {
    init_node_globals();
    var cenc = require_compact_encoding();
    var b4a = require_browser2();
    var crc32 = require_crc32();
    module.exports = class Oplog {
      constructor(storage, { pageSize = 4096, headerEncoding = cenc.raw, entryEncoding = cenc.raw } = {}) {
        this.storage = storage;
        this.headerEncoding = headerEncoding;
        this.entryEncoding = entryEncoding;
        this.flushed = false;
        this.byteLength = 0;
        this.length = 0;
        this._headers = [1, 0];
        this._pageSize = pageSize;
        this._entryOffset = pageSize * 2;
      }
      _addHeader(state, len, headerBit, partialBit) {
        state.start = state.start - len - 4;
        cenc.uint32.encode(state, len << 2 | headerBit | partialBit);
        state.start -= 8;
        cenc.uint32.encode(state, crc32(state.buffer.subarray(state.start + 4, state.start + 8 + len)));
        state.start += len + 4;
      }
      _decodeEntry(state, enc) {
        if (state.end - state.start < 8)
          return null;
        const cksum = cenc.uint32.decode(state);
        const l = cenc.uint32.decode(state);
        const length = l >>> 2;
        const headerBit = l & 1;
        const partialBit = l & 2;
        if (state.end - state.start < length)
          return null;
        const end = state.start + length;
        if (crc32(state.buffer.subarray(state.start - 4, end)) !== cksum) {
          return null;
        }
        const result = { header: headerBit, partial: partialBit !== 0, byteLength: length + 8, message: null };
        try {
          result.message = enc.decode({ start: state.start, end, buffer: state.buffer });
        } catch {
          return null;
        }
        state.start = end;
        return result;
      }
      async open() {
        const buffer = await this._readAll();
        const state = { start: 0, end: buffer.byteLength, buffer };
        const result = { header: null, entries: [] };
        this.byteLength = 0;
        this.length = 0;
        const h1 = this._decodeEntry(state, this.headerEncoding);
        state.start = this._pageSize;
        const h2 = this._decodeEntry(state, this.headerEncoding);
        state.start = this._entryOffset;
        if (!h1 && !h2) {
          this.flushed = false;
          this._headers[0] = 1;
          this._headers[1] = 0;
          if (buffer.byteLength >= this._entryOffset) {
            throw new Error("Oplog file appears corrupt or out of date");
          }
          return result;
        }
        this.flushed = true;
        if (h1 && !h2) {
          this._headers[0] = h1.header;
          this._headers[1] = h1.header;
        } else if (!h1 && h2) {
          this._headers[0] = h2.header + 1 & 1;
          this._headers[1] = h2.header;
        } else {
          this._headers[0] = h1.header;
          this._headers[1] = h2.header;
        }
        const header = this._headers[0] + this._headers[1] & 1;
        const decoded = [];
        result.header = header ? h2.message : h1.message;
        while (true) {
          const entry = this._decodeEntry(state, this.entryEncoding);
          if (!entry)
            break;
          if (entry.header !== header)
            break;
          decoded.push(entry);
        }
        while (decoded.length > 0 && decoded[decoded.length - 1].partial)
          decoded.pop();
        for (const e of decoded) {
          result.entries.push(e.message);
          this.byteLength += e.byteLength;
          this.length++;
        }
        const size = this.byteLength + this._entryOffset;
        if (size === buffer.byteLength)
          return result;
        await new Promise((resolve, reject) => {
          this.storage.del(size, Infinity, (err) => {
            if (err)
              return reject(err);
            resolve();
          });
        });
        return result;
      }
      _readAll() {
        return new Promise((resolve, reject) => {
          this.storage.open((err) => {
            if (err && err.code !== "ENOENT")
              return reject(err);
            if (err)
              return resolve(b4a.alloc(0));
            this.storage.stat((err2, stat) => {
              if (err2 && err2.code !== "ENOENT")
                return reject(err2);
              this.storage.read(0, stat.size, (err3, buf) => {
                if (err3)
                  return reject(err3);
                resolve(buf);
              });
            });
          });
        });
      }
      flush(header) {
        const state = { start: 8, end: 8, buffer: null };
        const i = this._headers[0] === this._headers[1] ? 1 : 0;
        const bit = this._headers[i] + 1 & 1;
        this.headerEncoding.preencode(state, header);
        state.buffer = b4a.allocUnsafe(state.end);
        this.headerEncoding.encode(state, header);
        this._addHeader(state, state.end - 8, bit, 0);
        return this._writeHeaderAndTruncate(i, bit, state.buffer);
      }
      _writeHeaderAndTruncate(i, bit, buf) {
        return new Promise((resolve, reject) => {
          this.storage.write(i === 0 ? 0 : this._pageSize, buf, (err) => {
            if (err)
              return reject(err);
            this.storage.del(this._entryOffset, Infinity, (err2) => {
              if (err2)
                return reject(err2);
              this._headers[i] = bit;
              this.byteLength = 0;
              this.length = 0;
              this.flushed = true;
              resolve();
            });
          });
        });
      }
      append(batch, atomic = true) {
        if (!Array.isArray(batch))
          batch = [batch];
        const state = { start: 0, end: batch.length * 8, buffer: null };
        const bit = this._headers[0] + this._headers[1] & 1;
        for (let i = 0; i < batch.length; i++) {
          this.entryEncoding.preencode(state, batch[i]);
        }
        state.buffer = b4a.allocUnsafe(state.end);
        for (let i = 0; i < batch.length; i++) {
          const start = state.start += 8;
          const partial = atomic && i < batch.length - 1 ? 2 : 0;
          this.entryEncoding.encode(state, batch[i]);
          this._addHeader(state, state.start - start, bit, partial);
        }
        return this._append(state.buffer, batch.length);
      }
      close() {
        return new Promise((resolve, reject) => {
          this.storage.close((err) => {
            if (err)
              return reject(err);
            resolve();
          });
        });
      }
      _append(buf, count) {
        return new Promise((resolve, reject) => {
          this.storage.write(this._entryOffset + this.byteLength, buf, (err) => {
            if (err)
              return reject(err);
            this.byteLength += buf.byteLength;
            this.length += count;
            resolve();
          });
        });
      }
    };
  }
});

// node_modules/hypercore/lib/mutex.js
var require_mutex = __commonJS({
  "node_modules/hypercore/lib/mutex.js"(exports, module) {
    init_node_globals();
    module.exports = class Mutex {
      constructor() {
        this.locked = false;
        this.destroyed = false;
        this._destroying = null;
        this._destroyError = null;
        this._queue = [];
        this._enqueue = (resolve, reject) => this._queue.push([resolve, reject]);
      }
      lock() {
        if (this.destroyed)
          return Promise.reject(this._destroyError);
        if (this.locked)
          return new Promise(this._enqueue);
        this.locked = true;
        return Promise.resolve();
      }
      unlock() {
        if (!this._queue.length) {
          this.locked = false;
          return;
        }
        this._queue.shift()[0]();
      }
      destroy(err) {
        if (!this._destroying)
          this._destroying = this.locked ? this.lock().catch(() => {
          }) : Promise.resolve();
        this.destroyed = true;
        this._destroyError = err || new Error("Mutex has been destroyed");
        if (err) {
          while (this._queue.length)
            this._queue.shift()[1](err);
        }
        return this._destroying;
      }
    };
  }
});

// node_modules/flat-tree/index.js
var require_flat_tree = __commonJS({
  "node_modules/flat-tree/index.js"(exports) {
    init_node_globals();
    exports.fullRoots = function(index, result) {
      if (index & 1)
        throw new Error("You can only look up roots for depth(0) blocks");
      if (!result)
        result = [];
      index /= 2;
      var offset = 0;
      var factor = 1;
      while (true) {
        if (!index)
          return result;
        while (factor * 2 <= index)
          factor *= 2;
        result.push(offset + factor - 1);
        offset = offset + 2 * factor;
        index -= factor;
        factor = 1;
      }
    };
    exports.depth = function(index) {
      var depth = 0;
      index += 1;
      while (!(index & 1)) {
        depth++;
        index = rightShift(index);
      }
      return depth;
    };
    exports.sibling = function(index, depth) {
      if (!depth)
        depth = exports.depth(index);
      var offset = exports.offset(index, depth);
      return exports.index(depth, offset & 1 ? offset - 1 : offset + 1);
    };
    exports.parent = function(index, depth) {
      if (!depth)
        depth = exports.depth(index);
      var offset = exports.offset(index, depth);
      return exports.index(depth + 1, rightShift(offset));
    };
    exports.leftChild = function(index, depth) {
      if (!(index & 1))
        return -1;
      if (!depth)
        depth = exports.depth(index);
      return exports.index(depth - 1, exports.offset(index, depth) * 2);
    };
    exports.rightChild = function(index, depth) {
      if (!(index & 1))
        return -1;
      if (!depth)
        depth = exports.depth(index);
      return exports.index(depth - 1, 1 + exports.offset(index, depth) * 2);
    };
    exports.children = function(index, depth) {
      if (!(index & 1))
        return null;
      if (!depth)
        depth = exports.depth(index);
      var offset = exports.offset(index, depth) * 2;
      return [
        exports.index(depth - 1, offset),
        exports.index(depth - 1, offset + 1)
      ];
    };
    exports.leftSpan = function(index, depth) {
      if (!(index & 1))
        return index;
      if (!depth)
        depth = exports.depth(index);
      return exports.offset(index, depth) * twoPow(depth + 1);
    };
    exports.rightSpan = function(index, depth) {
      if (!(index & 1))
        return index;
      if (!depth)
        depth = exports.depth(index);
      return (exports.offset(index, depth) + 1) * twoPow(depth + 1) - 2;
    };
    exports.count = function(index, depth) {
      if (!(index & 1))
        return 1;
      if (!depth)
        depth = exports.depth(index);
      return twoPow(depth + 1) - 1;
    };
    exports.countLeaves = function(index) {
      return (exports.count(index) + 1) / 2;
    };
    exports.spans = function(index, depth) {
      if (!(index & 1))
        return [index, index];
      if (!depth)
        depth = exports.depth(index);
      var offset = exports.offset(index, depth);
      var width = twoPow(depth + 1);
      return [offset * width, (offset + 1) * width - 2];
    };
    exports.index = function(depth, offset) {
      return (1 + 2 * offset) * twoPow(depth) - 1;
    };
    exports.offset = function(index, depth) {
      if (!(index & 1))
        return index / 2;
      if (!depth)
        depth = exports.depth(index);
      return ((index + 1) / twoPow(depth) - 1) / 2;
    };
    exports.iterator = function(index) {
      var ite = new Iterator();
      ite.seek(index || 0);
      return ite;
    };
    function twoPow(n) {
      return n < 31 ? 1 << n : (1 << 30) * (1 << n - 30);
    }
    function rightShift(n) {
      return (n - (n & 1)) / 2;
    }
    function Iterator() {
      this.index = 0;
      this.offset = 0;
      this.factor = 0;
    }
    Iterator.prototype.seek = function(index) {
      this.index = index;
      if (this.index & 1) {
        this.offset = exports.offset(index);
        this.factor = twoPow(exports.depth(index) + 1);
      } else {
        this.offset = index / 2;
        this.factor = 2;
      }
    };
    Iterator.prototype.isLeft = function() {
      return (this.offset & 1) === 0;
    };
    Iterator.prototype.isRight = function() {
      return (this.offset & 1) === 1;
    };
    Iterator.prototype.contains = function(index) {
      return index > this.index ? index < this.index + this.factor / 2 : index < this.index ? index > this.index - this.factor / 2 : true;
    };
    Iterator.prototype.prev = function() {
      if (!this.offset)
        return this.index;
      this.offset--;
      this.index -= this.factor;
      return this.index;
    };
    Iterator.prototype.next = function() {
      this.offset++;
      this.index += this.factor;
      return this.index;
    };
    Iterator.prototype.count = function() {
      if (!(this.index & 1))
        return 1;
      return this.factor - 1;
    };
    Iterator.prototype.countLeaves = function() {
      return (this.count() + 1) / 2;
    };
    Iterator.prototype.sibling = function() {
      return this.isLeft() ? this.next() : this.prev();
    };
    Iterator.prototype.parent = function() {
      if (this.offset & 1) {
        this.index -= this.factor / 2;
        this.offset = (this.offset - 1) / 2;
      } else {
        this.index += this.factor / 2;
        this.offset /= 2;
      }
      this.factor *= 2;
      return this.index;
    };
    Iterator.prototype.leftSpan = function() {
      this.index = this.index - this.factor / 2 + 1;
      this.offset = this.index / 2;
      this.factor = 2;
      return this.index;
    };
    Iterator.prototype.rightSpan = function() {
      this.index = this.index + this.factor / 2 - 1;
      this.offset = this.index / 2;
      this.factor = 2;
      return this.index;
    };
    Iterator.prototype.leftChild = function() {
      if (this.factor === 2)
        return this.index;
      this.factor /= 2;
      this.index -= this.factor / 2;
      this.offset *= 2;
      return this.index;
    };
    Iterator.prototype.rightChild = function() {
      if (this.factor === 2)
        return this.index;
      this.factor /= 2;
      this.index += this.factor / 2;
      this.offset = 2 * this.offset + 1;
      return this.index;
    };
    Iterator.prototype.nextTree = function() {
      this.index = this.index + this.factor / 2 + 1;
      this.offset = this.index / 2;
      this.factor = 2;
      return this.index;
    };
    Iterator.prototype.prevTree = function() {
      if (!this.offset) {
        this.index = 0;
        this.factor = 2;
      } else {
        this.index = this.index - this.factor / 2 - 1;
        this.offset = this.index / 2;
        this.factor = 2;
      }
      return this.index;
    };
    Iterator.prototype.fullRoot = function(index) {
      if (index <= this.index || (this.index & 1) > 0)
        return false;
      while (index > this.index + this.factor + this.factor / 2) {
        this.index += this.factor / 2;
        this.factor *= 2;
        this.offset /= 2;
      }
      return true;
    };
  }
});

// node_modules/hypercore/lib/merkle-tree.js
var require_merkle_tree = __commonJS({
  "node_modules/hypercore/lib/merkle-tree.js"(exports, module) {
    init_node_globals();
    var flat = require_flat_tree();
    var crypto = require_hypercore_crypto2();
    var c = require_compact_encoding();
    var b4a = require_browser2();
    var BLANK_HASH = b4a.alloc(32);
    var OLD_TREE = b4a.from([5, 2, 87, 2, 0, 0, 40, 7, 66, 76, 65, 75, 69, 50, 98]);
    var NodeQueue = class {
      constructor(nodes, extra = null) {
        this.i = 0;
        this.nodes = nodes;
        this.extra = extra;
        this.length = nodes.length + (this.extra === null ? 0 : 1);
      }
      shift(index) {
        if (this.extra !== null && this.extra.index === index) {
          const node2 = this.extra;
          this.extra = null;
          this.length--;
          return node2;
        }
        if (this.i >= this.nodes.length) {
          throw new Error("Expected node " + index + ", got (nil)");
        }
        const node = this.nodes[this.i++];
        if (node.index !== index) {
          throw new Error("Expected node " + index + ", got node " + node.index);
        }
        this.length--;
        return node;
      }
    };
    var MerkleTreeBatch = class {
      constructor(tree) {
        this.fork = tree.fork;
        this.roots = [...tree.roots];
        this.length = tree.length;
        this.ancestors = tree.length;
        this.byteLength = tree.byteLength;
        this.signature = null;
        this.treeLength = tree.length;
        this.treeFork = tree.fork;
        this.tree = tree;
        this.nodes = [];
        this.upgraded = false;
      }
      hash() {
        return this.tree.crypto.tree(this.roots);
      }
      signable(hash = this.hash()) {
        return signable(hash, this.length, this.fork);
      }
      signedBy(key) {
        return this.signature !== null && this.tree.crypto.verify(this.signable(), this.signature, key);
      }
      append(buf) {
        const head = this.length * 2;
        const ite = flat.iterator(head);
        const node = blockNode(this.tree.crypto, head, buf);
        this.appendRoot(node, ite);
      }
      appendRoot(node, ite) {
        this.upgraded = true;
        this.length += ite.factor / 2;
        this.byteLength += node.size;
        this.roots.push(node);
        this.nodes.push(node);
        while (this.roots.length > 1) {
          const a = this.roots[this.roots.length - 1];
          const b = this.roots[this.roots.length - 2];
          if (ite.sibling() !== b.index) {
            ite.sibling();
            break;
          }
          const node2 = parentNode(this.tree.crypto, ite.parent(), a, b);
          this.nodes.push(node2);
          this.roots.pop();
          this.roots.pop();
          this.roots.push(node2);
        }
      }
      commitable() {
        return this.treeFork === this.tree.fork && (this.upgraded ? this.treeLength === this.tree.length : this.treeLength <= this.tree.length);
      }
      commit() {
        if (!this.commitable())
          throw new Error("Tree was modified during batch, refusing to commit");
        if (this.upgraded)
          this._commitUpgrade();
        for (let i = 0; i < this.nodes.length; i++) {
          const node = this.nodes[i];
          this.tree.unflushed.set(node.index, node);
        }
      }
      _commitUpgrade() {
        if (this.ancestors < this.treeLength) {
          if (this.ancestors > 0) {
            const head = 2 * this.ancestors;
            const ite = flat.iterator(head - 2);
            while (true) {
              if (ite.contains(head) && ite.index < head) {
                this.tree.unflushed.set(ite.index, blankNode(ite.index));
              }
              if (ite.offset === 0)
                break;
              ite.parent();
            }
          }
          this.tree.truncateTo = this.tree.truncated ? Math.min(this.tree.truncateTo, this.ancestors) : this.ancestors;
          this.tree.truncated = true;
          truncateMap(this.tree.unflushed, this.ancestors);
          if (this.tree.flushing !== null)
            truncateMap(this.tree.flushing, this.ancestors);
        }
        this.tree.roots = this.roots;
        this.tree.length = this.length;
        this.tree.byteLength = this.byteLength;
        this.tree.fork = this.fork;
        this.tree.signature = this.signature;
      }
      async byteOffset(index) {
        if (2 * this.tree.length === index)
          return this.tree.byteLength;
        const ite = flat.iterator(index);
        let treeOffset = 0;
        let isRight = false;
        let parent = null;
        for (const node of this.nodes) {
          if (node.index === ite.index) {
            if (isRight && parent)
              treeOffset += node.size - parent.size;
            parent = node;
            isRight = ite.isRight();
            ite.parent();
          }
        }
        const r = this.roots.indexOf(parent);
        if (r > -1) {
          for (let i = 0; i < r; i++) {
            treeOffset += this.roots[i].size;
          }
          return treeOffset;
        }
        const byteOffset = await this.tree.byteOffset(parent ? parent.index : index);
        return byteOffset + treeOffset;
      }
    };
    var ReorgBatch = class extends MerkleTreeBatch {
      constructor(tree) {
        super(tree);
        this.roots = [];
        this.length = 0;
        this.byteLength = 0;
        this.diff = null;
        this.ancestors = 0;
        this.upgraded = true;
        this.want = {
          nodes: 0,
          start: 0,
          end: 0
        };
      }
      get finished() {
        return this.want === null;
      }
      update(proof) {
        if (this.want === null)
          return true;
        const nodes = [];
        const root = verifyBlock(proof, this.tree.crypto, nodes);
        if (root === null || !b4a.equals(root.hash, this.diff.hash))
          return false;
        this.nodes.push(...nodes);
        return this._update(nodes);
      }
      async _update(nodes) {
        const n = /* @__PURE__ */ new Map();
        for (const node of nodes)
          n.set(node.index, node);
        let diff = null;
        const ite = flat.iterator(this.diff.index);
        while ((ite.index & 1) !== 0) {
          const left = n.get(ite.leftChild());
          if (!left)
            break;
          const existing = await this.tree.get(left.index, false);
          if (!existing || !b4a.equals(existing.hash, left.hash)) {
            diff = left;
          } else {
            diff = n.get(ite.sibling());
          }
        }
        if ((this.diff.index & 1) === 0)
          return true;
        if (diff === null)
          return false;
        return this._updateDiffRoot(diff);
      }
      _updateDiffRoot(diff) {
        if (this.want === null)
          return true;
        const spans = flat.spans(diff.index);
        const start = spans[0] / 2;
        const end = Math.min(this.treeLength, spans[1] / 2 + 1);
        const len = end - start;
        if (this.diff !== null && len >= this.want.end - this.want.start) {
          return false;
        }
        this.ancestors = start;
        this.diff = diff;
        if ((diff.index & 1) === 0 || this.want.start >= this.treeLength || len <= 0) {
          this.want = null;
          return true;
        }
        this.want.start = start;
        this.want.end = end;
        this.want.nodes = log2(spans[1] - spans[0] + 2) - 1;
        return false;
      }
    };
    var ByteSeeker = class {
      constructor(tree, bytes, padding = 0) {
        this.tree = tree;
        this.bytes = bytes;
        this.padding = padding;
        const size = tree.byteLength - tree.length * padding;
        this.start = bytes >= size ? tree.length : 0;
        this.end = bytes < size ? tree.length : 0;
      }
      nodes() {
        return this.tree.nodes(this.start * 2);
      }
      async _seek(bytes) {
        if (!bytes)
          return [0, 0];
        for (const node of this.tree.roots) {
          let size = node.size;
          if (this.padding > 0)
            size -= this.padding * flat.countLeaves(node.index);
          if (bytes === size)
            return [flat.rightSpan(node.index) + 2, 0];
          if (bytes > size) {
            bytes -= size;
            continue;
          }
          const ite = flat.iterator(node.index);
          while ((ite.index & 1) !== 0) {
            const l = await this.tree.get(ite.leftChild(), false);
            if (l) {
              let size2 = l.size;
              if (this.padding > 0)
                size2 -= this.padding * ite.countLeaves();
              if (size2 === bytes)
                return [ite.rightSpan() + 2, 0];
              if (size2 > bytes)
                continue;
              bytes -= size2;
              ite.sibling();
            } else {
              ite.parent();
              return [ite.index, bytes];
            }
          }
          return [ite.index, bytes];
        }
        return null;
      }
      async update() {
        const res = await this._seek(this.bytes);
        if (!res)
          return null;
        if ((res[0] & 1) === 0)
          return [res[0] / 2, res[1]];
        const span = flat.spans(res[0]);
        this.start = span[0] / 2;
        this.end = span[1] / 2 + 1;
        return null;
      }
    };
    module.exports = class MerkleTree {
      constructor(storage, roots, fork, signature) {
        this.crypto = crypto;
        this.fork = fork;
        this.roots = roots;
        this.length = roots.length ? totalSpan(roots) / 2 : 0;
        this.byteLength = totalSize(roots);
        this.signature = signature;
        this.storage = storage;
        this.unflushed = /* @__PURE__ */ new Map();
        this.flushing = null;
        this.truncated = false;
        this.truncateTo = 0;
      }
      addNode(node) {
        if (node.size === 0 && b4a.equals(node.hash, BLANK_HASH))
          node = blankNode(node.index);
        this.unflushed.set(node.index, node);
      }
      batch() {
        return new MerkleTreeBatch(this);
      }
      seek(bytes, padding) {
        return new ByteSeeker(this, bytes, padding);
      }
      hash() {
        return this.crypto.tree(this.roots);
      }
      signable(hash = this.hash()) {
        return signable(hash, this.length, this.fork);
      }
      signedBy(key) {
        return this.signature !== null && this.crypto.verify(this.signable(), this.signature, key);
      }
      getRoots(length) {
        const indexes = flat.fullRoots(2 * length);
        const roots = new Array(indexes.length);
        for (let i = 0; i < indexes.length; i++) {
          roots[i] = this.get(indexes[i], true);
        }
        return Promise.all(roots);
      }
      get(index, error = true) {
        let node = this.unflushed.get(index);
        if (this.flushing !== null && node === void 0) {
          node = this.flushing.get(index);
        }
        if (this.truncated && node !== void 0 && node.index >= 2 * this.truncateTo) {
          node = blankNode(index);
        }
        if (node !== void 0) {
          if (node.hash === BLANK_HASH) {
            if (error)
              throw new Error("Could not load node: " + index);
            return Promise.resolve(null);
          }
          return Promise.resolve(node);
        }
        return getStoredNode(this.storage, index, error);
      }
      async flush() {
        this.flushing = this.unflushed;
        this.unflushed = /* @__PURE__ */ new Map();
        try {
          if (this.truncated)
            await this._flushTruncation();
          await this._flushNodes();
        } catch (err) {
          for (const node of this.flushing.values()) {
            if (!this.unflushed.has(node.index))
              this.unflushed.set(node.index, node);
          }
          throw err;
        } finally {
          this.flushing = null;
        }
      }
      _flushTruncation() {
        return new Promise((resolve, reject) => {
          const t = this.truncateTo;
          const offset = t === 0 ? 0 : (t - 1) * 80 + 40;
          this.storage.del(offset, Infinity, (err) => {
            if (err)
              return reject(err);
            if (this.truncateTo === t) {
              this.truncateTo = 0;
              this.truncated = false;
            }
            resolve();
          });
        });
      }
      _flushNodes() {
        return new Promise((resolve, reject) => {
          const slab = b4a.allocUnsafe(40 * this.flushing.size);
          let error = null;
          let missing = this.flushing.size + 1;
          let offset = 0;
          for (const node of this.flushing.values()) {
            const state = {
              start: 0,
              end: 40,
              buffer: slab.subarray(offset, offset += 40)
            };
            c.uint64.encode(state, node.size);
            c.raw.encode(state, node.hash);
            this.storage.write(node.index * 40, state.buffer, done);
          }
          done(null);
          function done(err) {
            if (err)
              error = err;
            if (--missing > 0)
              return;
            if (error)
              reject(error);
            else
              resolve();
          }
        });
      }
      clear() {
        this.truncated = true;
        this.truncateTo = 0;
        this.roots = [];
        this.length = 0;
        this.byteLength = 0;
        this.fork = 0;
        this.signature = null;
        if (this.flushing !== null)
          this.flushing.clear();
        this.unflushed.clear();
        return this.flush();
      }
      close() {
        return new Promise((resolve, reject) => {
          this.storage.close((err) => {
            if (err)
              reject(err);
            else
              resolve();
          });
        });
      }
      async truncate(length, fork = this.fork) {
        const head = length * 2;
        const batch = new MerkleTreeBatch(this);
        const fullRoots = flat.fullRoots(head);
        for (let i = 0; i < fullRoots.length; i++) {
          const root = fullRoots[i];
          if (i < batch.roots.length && batch.roots[i].index === root)
            continue;
          while (batch.roots.length > i)
            batch.roots.pop();
          batch.roots.push(await this.get(root));
        }
        while (batch.roots.length > fullRoots.length) {
          batch.roots.pop();
        }
        batch.fork = fork;
        batch.length = length;
        batch.ancestors = length;
        batch.byteLength = totalSize(batch.roots);
        batch.upgraded = true;
        return batch;
      }
      async reorg(proof) {
        const batch = new ReorgBatch(this);
        let unverified = null;
        if (proof.block || proof.seek) {
          unverified = verifyBlock(proof, this.crypto, batch.nodes);
        }
        if (!verifyUpgrade(proof, unverified, batch)) {
          throw new Error("Fork proof not verifiable");
        }
        for (const root of batch.roots) {
          const existing = await this.get(root.index, false);
          if (existing && b4a.equals(existing.hash, root.hash))
            continue;
          batch._updateDiffRoot(root);
          break;
        }
        if (batch.diff !== null) {
          await batch._update(batch.nodes);
        } else {
          batch.want = null;
          batch.ancestors = batch.length;
        }
        return batch;
      }
      async verify(proof) {
        const batch = new MerkleTreeBatch(this);
        let unverified = verifyBlock(proof, this.crypto, batch.nodes);
        if (proof.upgrade) {
          if (verifyUpgrade(proof, unverified, batch)) {
            unverified = null;
          }
        }
        if (unverified) {
          const verified = await this.get(unverified.index);
          if (!b4a.equals(verified.hash, unverified.hash)) {
            throw new Error("Invalid checksum at node " + unverified.index);
          }
        }
        return batch;
      }
      async proof({ block, seek, upgrade }) {
        const signature = this.signature;
        const fork = this.fork;
        const head = 2 * this.length;
        const from = upgrade ? upgrade.start * 2 : 0;
        const to = upgrade ? from + upgrade.length * 2 : head;
        if (from >= to || to > head) {
          throw new Error("Invalid upgrade");
        }
        if (seek && block && upgrade && block.index * 2 >= from) {
          throw new Error("Cannot both do a seek and block request when upgrading");
        }
        let subTree = head;
        const p = {
          block: null,
          seek: null,
          upgrade: null,
          additionalUpgrade: null
        };
        if (block && (!upgrade || block.index < upgrade.start)) {
          subTree = nodesToRoot(2 * block.index, block.nodes, to);
          const seekRoot = seek ? await seekUntrustedTree(this, subTree, seek.bytes) : head;
          blockAndSeekProof(this, block, seek, seekRoot, subTree, p);
        } else if ((block || seek) && upgrade) {
          subTree = seek ? await seekFromHead(this, to, seek.bytes) : 2 * block.index;
        }
        if (upgrade) {
          upgradeProof(this, block, seek, from, to, subTree, p);
          if (head > to)
            additionalUpgradeProof(this, to, head, p);
        }
        try {
          const result = { fork, block: null, seek: null, upgrade: null };
          if (block) {
            const nodes = await Promise.all(p.block);
            result.block = {
              index: block.index,
              value: null,
              nodes
            };
          }
          if (seek && p.seek !== null) {
            const nodes = await Promise.all(p.seek);
            result.seek = {
              bytes: seek.bytes,
              nodes
            };
          }
          if (upgrade) {
            const nodes = await Promise.all(p.upgrade);
            const additionalNodes = await Promise.all(p.additionalUpgrade || []);
            result.upgrade = {
              start: upgrade.start,
              length: upgrade.length,
              nodes,
              additionalNodes,
              signature
            };
          }
          return result;
        } catch (err) {
          if (p.seek !== null)
            await Promise.allSettled(p.seek);
          if (p.block !== null)
            await Promise.allSettled(p.block);
          if (p.upgrade !== null)
            await Promise.allSettled(p.upgrade);
          if (p.additionalUpgrade !== null)
            await Promise.allSettled(p.additionalUpgrade);
          throw err;
        }
      }
      async nodes(index) {
        const head = 2 * this.length;
        const ite = flat.iterator(index);
        let cnt = 0;
        while (!ite.contains(head) && await this.get(ite.index, false) === null) {
          cnt++;
          ite.parent();
        }
        return cnt;
      }
      async byteRange(index) {
        const head = 2 * this.length;
        if (((index & 1) === 0 ? index : flat.rightSpan(index)) >= head) {
          throw new Error("Index is out of bounds");
        }
        return [await this.byteOffset(index), (await this.get(index)).size];
      }
      async byteOffset(index) {
        if ((index & 1) === 1)
          index = flat.leftSpan(index);
        let head = 0;
        let offset = 0;
        for (const node of this.roots) {
          head += 2 * (node.index - head + 1);
          if (index >= head) {
            offset += node.size;
            continue;
          }
          const ite = flat.iterator(node.index);
          while (ite.index !== index) {
            if (index < ite.index) {
              ite.leftChild();
            } else {
              offset += (await this.get(ite.leftChild())).size;
              ite.sibling();
            }
          }
          return offset;
        }
      }
      static async open(storage, opts = {}) {
        await new Promise((resolve, reject) => {
          storage.read(0, OLD_TREE.length, (err, buf) => {
            if (err)
              return resolve();
            if (b4a.equals(buf, OLD_TREE))
              return reject(new Error("Storage contains an incompatible merkle tree"));
            resolve();
          });
        });
        const length = typeof opts.length === "number" ? opts.length : await autoLength(storage);
        const roots = [];
        for (const index of flat.fullRoots(2 * length)) {
          roots.push(await getStoredNode(storage, index, true));
        }
        return new MerkleTree(storage, roots, opts.fork || 0, opts.signature || null);
      }
    };
    function verifyBlock({ block, seek }, crypto2, nodes) {
      if (!block && (!seek || !seek.nodes.length))
        return null;
      let root = null;
      if (seek && seek.nodes.length) {
        const ite2 = flat.iterator(seek.nodes[0].index);
        const q2 = new NodeQueue(seek.nodes);
        root = q2.shift(ite2.index);
        nodes.push(root);
        while (q2.length > 0) {
          const node = q2.shift(ite2.sibling());
          root = parentNode(crypto2, ite2.parent(), root, node);
          nodes.push(node);
          nodes.push(root);
        }
      }
      if (!block)
        return root;
      const ite = flat.iterator(2 * block.index);
      const blockHash = block.value && blockNode(crypto2, ite.index, block.value);
      const q = new NodeQueue(block.nodes, root);
      root = blockHash || q.shift(ite.index);
      nodes.push(root);
      while (q.length > 0) {
        const node = q.shift(ite.sibling());
        root = parentNode(crypto2, ite.parent(), root, node);
        nodes.push(node);
        nodes.push(root);
      }
      return root;
    }
    function verifyUpgrade({ fork, upgrade }, blockRoot, batch) {
      const q = new NodeQueue(upgrade.nodes, blockRoot);
      let grow = batch.roots.length > 0;
      let i = 0;
      const to = 2 * (upgrade.start + upgrade.length);
      const ite = flat.iterator(0);
      for (; ite.fullRoot(to); ite.nextTree()) {
        if (i < batch.roots.length && batch.roots[i].index === ite.index) {
          i++;
          continue;
        }
        if (grow) {
          grow = false;
          const root = ite.index;
          if (i < batch.roots.length) {
            ite.seek(batch.roots[batch.roots.length - 1].index);
            while (ite.index !== root) {
              batch.appendRoot(q.shift(ite.sibling()), ite);
            }
            continue;
          }
        }
        batch.appendRoot(q.shift(ite.index), ite);
      }
      const extra = upgrade.additionalNodes;
      ite.seek(batch.roots[batch.roots.length - 1].index);
      i = 0;
      while (i < extra.length && extra[i].index === ite.sibling()) {
        batch.appendRoot(extra[i++], ite);
      }
      while (i < extra.length) {
        const node = extra[i++];
        while (node.index !== ite.index) {
          if (ite.factor === 2)
            throw new Error("Unexpected node: " + node.index);
          ite.leftChild();
        }
        batch.appendRoot(node, ite);
        ite.sibling();
      }
      batch.signature = upgrade.signature;
      batch.fork = fork;
      return q.extra === null;
    }
    async function seekFromHead(tree, head, bytes) {
      const roots = flat.fullRoots(head);
      for (let i = 0; i < roots.length; i++) {
        const root = roots[i];
        const node = await tree.get(root);
        if (bytes === node.size)
          return root;
        if (bytes > node.size) {
          bytes -= node.size;
          continue;
        }
        return seekTrustedTree(tree, root, bytes);
      }
      return head;
    }
    async function seekTrustedTree(tree, root, bytes) {
      if (!bytes)
        return root;
      const ite = flat.iterator(root);
      while ((ite.index & 1) !== 0) {
        const l = await tree.get(ite.leftChild(), false);
        if (l) {
          if (l.size === bytes)
            return ite.index;
          if (l.size > bytes)
            continue;
          bytes -= l.size;
          ite.sibling();
        } else {
          ite.parent();
          return ite.index;
        }
      }
      return ite.index;
    }
    async function seekUntrustedTree(tree, root, bytes) {
      const offset = await tree.byteOffset(root);
      if (offset > bytes)
        throw new Error("Invalid seek");
      if (offset === bytes)
        return root;
      bytes -= offset;
      const node = await tree.get(root);
      if (node.size <= bytes)
        throw new Error("Invalid seek");
      return seekTrustedTree(tree, root, bytes);
    }
    function seekProof(tree, seekRoot, root, p) {
      const ite = flat.iterator(seekRoot);
      p.seek = [];
      p.seek.push(tree.get(ite.index));
      while (ite.index !== root) {
        ite.sibling();
        p.seek.push(tree.get(ite.index));
        ite.parent();
      }
    }
    function blockAndSeekProof(tree, block, seek, seekRoot, root, p) {
      if (!block)
        return seekProof(tree, seekRoot, root, p);
      const ite = flat.iterator(2 * block.index);
      p.block = [];
      if (!block.value)
        p.block.push(tree.get(ite.index));
      while (ite.index !== root) {
        ite.sibling();
        if (seek && ite.contains(seekRoot) && ite.index !== seekRoot) {
          seekProof(tree, seekRoot, ite.index, p);
        } else {
          p.block.push(tree.get(ite.index));
        }
        ite.parent();
      }
    }
    function upgradeProof(tree, block, seek, from, to, subTree, p) {
      if (from === 0)
        p.upgrade = [];
      for (const ite = flat.iterator(0); ite.fullRoot(to); ite.nextTree()) {
        if (ite.index + ite.factor / 2 < from)
          continue;
        if (p.upgrade === null && ite.contains(from - 2)) {
          p.upgrade = [];
          const root = ite.index;
          const target = from - 2;
          ite.seek(target);
          while (ite.index !== root) {
            ite.sibling();
            if (ite.index > target) {
              if (p.block === null && p.seek === null && ite.contains(subTree)) {
                blockAndSeekProof(tree, block, seek, subTree, ite.index, p);
              } else {
                p.upgrade.push(tree.get(ite.index));
              }
            }
            ite.parent();
          }
          continue;
        }
        if (p.upgrade === null) {
          p.upgrade = [];
        }
        if (p.block === null && p.seek === null && ite.contains(subTree)) {
          blockAndSeekProof(tree, block, seek, subTree, ite.index, p);
          continue;
        }
        p.upgrade.push(tree.get(ite.index));
      }
    }
    function additionalUpgradeProof(tree, from, to, p) {
      if (from === 0)
        p.additionalUpgrade = [];
      for (const ite = flat.iterator(0); ite.fullRoot(to); ite.nextTree()) {
        if (ite.index + ite.factor / 2 < from)
          continue;
        if (p.additionalUpgrade === null && ite.contains(from - 2)) {
          p.additionalUpgrade = [];
          const root = ite.index;
          const target = from - 2;
          ite.seek(target);
          while (ite.index !== root) {
            ite.sibling();
            if (ite.index > target) {
              p.additionalUpgrade.push(tree.get(ite.index));
            }
            ite.parent();
          }
          continue;
        }
        if (p.additionalUpgrade === null) {
          p.additionalUpgrade = [];
        }
        p.additionalUpgrade.push(tree.get(ite.index));
      }
    }
    function nodesToRoot(index, nodes, head) {
      const ite = flat.iterator(index);
      for (let i = 0; i < nodes; i++) {
        ite.parent();
        if (ite.contains(head))
          throw new Error("Nodes is out of bounds");
      }
      return ite.index;
    }
    function totalSize(nodes) {
      let s = 0;
      for (const node of nodes)
        s += node.size;
      return s;
    }
    function totalSpan(nodes) {
      let s = 0;
      for (const node of nodes)
        s += 2 * (node.index - s + 1);
      return s;
    }
    function blockNode(crypto2, index, value) {
      return { index, size: value.byteLength, hash: crypto2.data(value) };
    }
    function parentNode(crypto2, index, a, b) {
      return { index, size: a.size + b.size, hash: crypto2.parent(a, b) };
    }
    function blankNode(index) {
      return { index, size: 0, hash: BLANK_HASH };
    }
    function getStoredNode(storage, index, error) {
      return new Promise((resolve, reject) => {
        storage.read(40 * index, 40, (err, data) => {
          if (err) {
            if (error)
              return reject(err);
            else
              resolve(null);
            return;
          }
          const hash = data.subarray(8);
          const size = c.decode(c.uint64, data);
          if (size === 0 && b4a.compare(hash, BLANK_HASH) === 0) {
            if (error)
              reject(new Error("Could not load node: " + index));
            else
              resolve(null);
            return;
          }
          resolve({ index, size, hash });
        });
      });
    }
    function storedNodes(storage) {
      return new Promise((resolve) => {
        storage.stat((_, st) => {
          if (!st)
            return resolve(0);
          resolve((st.size - st.size % 40) / 40);
        });
      });
    }
    async function autoLength(storage) {
      const nodes = await storedNodes(storage);
      if (!nodes)
        return 0;
      const ite = flat.iterator(nodes - 1);
      let index = nodes - 1;
      while (await getStoredNode(storage, ite.parent(), false))
        index = ite.index;
      return flat.rightSpan(index) / 2 + 1;
    }
    function truncateMap(map, len) {
      for (const node of map.values()) {
        if (node.index >= 2 * len)
          map.delete(node.index);
      }
    }
    function log2(n) {
      let res = 1;
      while (n > 2) {
        n /= 2;
        res++;
      }
      return res;
    }
    function signable(hash, length, fork) {
      const state = { start: 0, end: 48, buffer: b4a.alloc(48) };
      c.raw.encode(state, hash);
      c.uint64.encode(state, length);
      c.uint64.encode(state, fork);
      return state.buffer;
    }
  }
});

// node_modules/hypercore/lib/block-store.js
var require_block_store = __commonJS({
  "node_modules/hypercore/lib/block-store.js"(exports, module) {
    init_node_globals();
    var b4a = require_browser2();
    module.exports = class BlockStore {
      constructor(storage, tree) {
        this.storage = storage;
        this.tree = tree;
      }
      async get(i) {
        const [offset, size] = await this.tree.byteRange(2 * i);
        return this._read(offset, size);
      }
      async put(i, data, offset) {
        return this._write(offset, data);
      }
      putBatch(i, batch, offset) {
        if (batch.length === 0)
          return Promise.resolve();
        return this.put(i, batch.length === 1 ? batch[0] : b4a.concat(batch), offset);
      }
      clear() {
        return new Promise((resolve, reject) => {
          this.storage.del(0, Infinity, (err) => {
            if (err)
              reject(err);
            else
              resolve();
          });
        });
      }
      close() {
        return new Promise((resolve, reject) => {
          this.storage.close((err) => {
            if (err)
              reject(err);
            else
              resolve();
          });
        });
      }
      _read(offset, size) {
        return new Promise((resolve, reject) => {
          this.storage.read(offset, size, (err, data) => {
            if (err)
              reject(err);
            else
              resolve(data);
          });
        });
      }
      _write(offset, data) {
        return new Promise((resolve, reject) => {
          this.storage.write(offset, data, (err) => {
            if (err)
              reject(err);
            else
              resolve();
          });
        });
      }
    };
  }
});

// node_modules/hypercore/lib/bitfield.js
var require_bitfield = __commonJS({
  "node_modules/hypercore/lib/bitfield.js"(exports, module) {
    init_node_globals();
    var BigSparseArray = require_big_sparse_array();
    var b4a = require_browser2();
    var FixedBitfield = class {
      constructor(index, bitfield) {
        this.dirty = false;
        this.index = index;
        this.bitfield = bitfield;
      }
      get(index) {
        const j = index & 31;
        const i = (index - j) / 32;
        return i < this.bitfield.length && (this.bitfield[i] & 1 << j) !== 0;
      }
      set(index, val2) {
        const j = index & 31;
        const i = (index - j) / 32;
        const v = this.bitfield[i];
        if (val2 === ((v & 1 << j) !== 0))
          return false;
        const u = val2 ? v | 1 << j : v ^ 1 << j;
        if (u === v)
          return false;
        this.bitfield[i] = u;
        return true;
      }
    };
    module.exports = class Bitfield {
      constructor(storage, buf) {
        this.pageSize = 32768;
        this.pages = new BigSparseArray();
        this.unflushed = [];
        this.storage = storage;
        const all = buf && buf.byteLength >= 4 ? new Uint32Array(buf.buffer, buf.byteOffset, Math.floor(buf.byteLength / 4)) : new Uint32Array(1024);
        for (let i = 0; i < all.length; i += 1024) {
          const bitfield = ensureSize(all.subarray(i, i + 1024), 1024);
          const page = new FixedBitfield(i / 1024, bitfield);
          this.pages.set(page.index, page);
        }
      }
      get(index) {
        const j = index & 32767;
        const i = (index - j) / 32768;
        const p = this.pages.get(i);
        return p ? p.get(j) : false;
      }
      set(index, val2) {
        const j = index & 32767;
        const i = (index - j) / 32768;
        let p = this.pages.get(i);
        if (!p) {
          if (!val2)
            return;
          p = this.pages.set(i, new FixedBitfield(i, new Uint32Array(1024)));
        }
        if (!p.set(j, val2) || p.dirty)
          return;
        p.dirty = true;
        this.unflushed.push(p);
      }
      setRange(start, length, val2) {
        for (let i = 0; i < length; i++) {
          this.set(start + i, val2);
        }
      }
      page(i) {
        const p = this.pages.get(i);
        return p ? p.bitfield : new Uint32Array(1024);
      }
      clear() {
        return new Promise((resolve, reject) => {
          this.storage.del(0, Infinity, (err) => {
            if (err)
              reject(err);
            else
              resolve();
          });
        });
      }
      close() {
        return new Promise((resolve, reject) => {
          this.storage.close((err) => {
            if (err)
              reject(err);
            else
              resolve();
          });
        });
      }
      flush() {
        return new Promise((resolve, reject) => {
          if (!this.unflushed.length)
            return resolve();
          const self2 = this;
          let missing = this.unflushed.length;
          let error = null;
          for (const page of this.unflushed) {
            const buf = b4a.from(page.bitfield.buffer, page.bitfield.byteOffset, page.bitfield.byteLength);
            page.dirty = false;
            this.storage.write(page.index * 4096, buf, done);
          }
          function done(err) {
            if (err)
              error = err;
            if (--missing)
              return;
            if (error)
              return reject(error);
            self2.unflushed = [];
            resolve();
          }
        });
      }
      static open(storage) {
        return new Promise((resolve, reject) => {
          storage.stat((err, st) => {
            if (err)
              return resolve(new Bitfield(storage, null));
            const size = st.size - (st.size & 3);
            if (!size)
              return resolve(new Bitfield(storage, null));
            storage.read(0, size, (err2, data) => {
              if (err2)
                return reject(err2);
              resolve(new Bitfield(storage, data));
            });
          });
        });
      }
    };
    function ensureSize(uint32, size) {
      if (uint32.length === size)
        return uint32;
      const a = new Uint32Array(1024);
      a.set(uint32, 0);
      return a;
    }
  }
});

// node_modules/hypercore/lib/core.js
var require_core = __commonJS({
  "node_modules/hypercore/lib/core.js"(exports, module) {
    init_node_globals();
    var hypercoreCrypto = require_hypercore_crypto2();
    var b4a = require_browser2();
    var Oplog = require_oplog();
    var Mutex = require_mutex();
    var MerkleTree = require_merkle_tree();
    var BlockStore = require_block_store();
    var Bitfield = require_bitfield();
    var { oplogHeader, oplogEntry } = require_messages();
    module.exports = class Core {
      constructor(header, crypto, oplog, tree, blocks, bitfield, sign, onupdate) {
        this.onupdate = onupdate;
        this.header = header;
        this.crypto = crypto;
        this.oplog = oplog;
        this.tree = tree;
        this.blocks = blocks;
        this.bitfield = bitfield;
        this.defaultSign = sign;
        this.truncating = 0;
        this._maxOplogSize = 65536;
        this._autoFlush = 1;
        this._verifies = null;
        this._verifiesFlushed = null;
        this._mutex = new Mutex();
      }
      static async open(storage, opts = {}) {
        const oplogFile = storage("oplog");
        const treeFile = storage("tree");
        const bitfieldFile = storage("bitfield");
        const dataFile = storage("data");
        try {
          return await this.resume(oplogFile, treeFile, bitfieldFile, dataFile, opts);
        } catch (err) {
          return new Promise((resolve, reject) => {
            let missing = 4;
            oplogFile.close(done);
            treeFile.close(done);
            bitfieldFile.close(done);
            dataFile.close(done);
            function done() {
              if (--missing === 0)
                reject(err);
            }
          });
        }
      }
      static createSigner(crypto, { publicKey, secretKey }) {
        if (!crypto.validateKeyPair({ publicKey, secretKey }))
          throw new Error("Invalid key pair");
        return (signable) => crypto.sign(signable, secretKey);
      }
      static async resume(oplogFile, treeFile, bitfieldFile, dataFile, opts) {
        const overwrite = opts.overwrite === true;
        const createIfMissing = opts.createIfMissing !== false;
        const crypto = opts.crypto || hypercoreCrypto;
        const oplog = new Oplog(oplogFile, {
          headerEncoding: oplogHeader,
          entryEncoding: oplogEntry
        });
        let { header, entries } = await oplog.open();
        if (!header || overwrite === true) {
          if (!createIfMissing) {
            throw new Error("No hypercore is stored here");
          }
          header = {
            types: { tree: "blake2b", bitfield: "raw", signer: "ed25519" },
            userData: [],
            tree: {
              fork: 0,
              length: 0,
              rootHash: null,
              signature: null
            },
            signer: opts.keyPair || crypto.keyPair(),
            hints: {
              reorgs: []
            }
          };
          await oplog.flush(header);
        }
        if (opts.keyPair && !b4a.equals(header.signer.publicKey, opts.keyPair.publicKey)) {
          throw new Error("Another hypercore is stored here");
        }
        const tree = await MerkleTree.open(treeFile, { crypto, ...header.tree });
        const bitfield = await Bitfield.open(bitfieldFile);
        const blocks = new BlockStore(dataFile, tree);
        if (overwrite) {
          await tree.clear();
          await blocks.clear();
          await bitfield.clear();
        }
        const sign = opts.sign || (header.signer.secretKey ? this.createSigner(crypto, header.signer) : null);
        for (const e of entries) {
          if (e.userData) {
            updateUserData(header.userData, e.userData.key, e.userData.value);
          }
          if (e.treeNodes) {
            for (const node of e.treeNodes) {
              tree.addNode(node);
            }
          }
          if (e.bitfield) {
            bitfield.setRange(e.bitfield.start, e.bitfield.length);
          }
          if (e.treeUpgrade) {
            const batch = await tree.truncate(e.treeUpgrade.length, e.treeUpgrade.fork);
            batch.ancestors = e.treeUpgrade.ancestors;
            batch.signature = e.treeUpgrade.signature;
            addReorgHint(header.hints.reorgs, tree, batch);
            batch.commit();
            header.tree.length = tree.length;
            header.tree.fork = tree.fork;
            header.tree.rootHash = tree.hash();
            header.tree.signature = tree.signature;
          }
        }
        return new this(header, crypto, oplog, tree, blocks, bitfield, sign, opts.onupdate || noop);
      }
      _shouldFlush() {
        if (--this._autoFlush <= 0 || this.oplog.byteLength >= this._maxOplogSize) {
          this._autoFlush = 4;
          return true;
        }
        return false;
      }
      async _flushOplog() {
        await this.bitfield.flush();
        await this.tree.flush();
        await this.oplog.flush(this.header);
      }
      _appendBlocks(values) {
        return this.blocks.putBatch(this.tree.length, values, this.tree.byteLength);
      }
      async _writeBlock(batch, index, value) {
        const byteOffset = await batch.byteOffset(index * 2);
        await this.blocks.put(index, value, byteOffset);
      }
      async userData(key, value) {
        await this._mutex.lock();
        try {
          let empty = true;
          for (const u of this.header.userData) {
            if (u.key !== key)
              continue;
            if (value && b4a.equals(u.value, value))
              return;
            empty = false;
            break;
          }
          if (empty && !value)
            return;
          const entry = {
            userData: { key, value },
            treeNodes: null,
            treeUpgrade: null,
            bitfield: null
          };
          await this.oplog.append([entry], false);
          updateUserData(this.header.userData, key, value);
          if (this._shouldFlush())
            await this._flushOplog();
        } finally {
          this._mutex.unlock();
        }
      }
      async truncate(length, fork, sign = this.defaultSign) {
        this.truncating++;
        await this._mutex.lock();
        try {
          const batch = await this.tree.truncate(length, fork);
          batch.signature = await sign(batch.signable());
          await this._truncate(batch, null);
        } finally {
          this.truncating--;
          this._mutex.unlock();
        }
      }
      async append(values, sign = this.defaultSign, hooks = {}) {
        await this._mutex.lock();
        try {
          if (hooks.preappend)
            await hooks.preappend(values);
          if (!values.length)
            return this.tree.length;
          const batch = this.tree.batch();
          for (const val2 of values)
            batch.append(val2);
          const hash = batch.hash();
          batch.signature = await sign(batch.signable(hash));
          const entry = {
            userData: null,
            treeNodes: batch.nodes,
            treeUpgrade: batch,
            bitfield: {
              drop: false,
              start: batch.ancestors,
              length: values.length
            }
          };
          await this._appendBlocks(values);
          await this.oplog.append([entry], false);
          this.bitfield.setRange(batch.ancestors, batch.length - batch.ancestors, true);
          batch.commit();
          this.header.tree.length = batch.length;
          this.header.tree.rootHash = hash;
          this.header.tree.signature = batch.signature;
          this.onupdate(1, entry.bitfield, null, null);
          if (this._shouldFlush())
            await this._flushOplog();
          return batch.ancestors;
        } finally {
          this._mutex.unlock();
        }
      }
      async _verifyExclusive({ batch, bitfield, value, from }) {
        const hash = batch.hash();
        if (!batch.signature || !this.crypto.verify(batch.signable(hash), batch.signature, this.header.signer.publicKey)) {
          throw new Error("Remote signature does not match");
        }
        await this._mutex.lock();
        try {
          if (!batch.commitable())
            return false;
          const entry = {
            userData: null,
            treeNodes: batch.nodes,
            treeUpgrade: batch,
            bitfield
          };
          if (bitfield)
            await this._writeBlock(batch, bitfield.start, value);
          await this.oplog.append([entry], false);
          if (bitfield)
            this.bitfield.set(bitfield.start, true);
          batch.commit();
          this.header.tree.fork = batch.fork;
          this.header.tree.length = batch.length;
          this.header.tree.rootHash = batch.rootHash;
          this.header.tree.signature = batch.signature;
          this.onupdate(1, bitfield, value, from);
          if (this._shouldFlush())
            await this._flushOplog();
        } finally {
          this._mutex.unlock();
        }
        return true;
      }
      async _verifyShared() {
        if (!this._verifies.length)
          return false;
        await this._mutex.lock();
        const verifies = this._verifies;
        this._verifies = null;
        this._verified = null;
        try {
          const entries = [];
          for (const { batch, bitfield, value } of verifies) {
            if (!batch.commitable())
              continue;
            if (bitfield) {
              await this._writeBlock(batch, bitfield.start, value);
            }
            entries.push({
              userData: null,
              treeNodes: batch.nodes,
              treeUpgrade: null,
              bitfield
            });
          }
          await this.oplog.append(entries, false);
          for (let i = 0; i < verifies.length; i++) {
            const { batch, bitfield, value, from } = verifies[i];
            if (!batch.commitable()) {
              verifies[i] = null;
              continue;
            }
            if (bitfield)
              this.bitfield.set(bitfield.start, true);
            batch.commit();
            this.onupdate(0, bitfield, value, from);
          }
          if (this._shouldFlush())
            await this._flushOplog();
        } finally {
          this._mutex.unlock();
        }
        return verifies[0] !== null;
      }
      async verify(proof, from) {
        if (proof.fork !== this.tree.fork)
          return false;
        const batch = await this.tree.verify(proof);
        if (!batch.commitable())
          return false;
        const value = proof.block && proof.block.value || null;
        const op = {
          batch,
          bitfield: value && { drop: false, start: proof.block.index, length: 1 },
          value,
          from
        };
        if (batch.upgraded)
          return this._verifyExclusive(op);
        if (this._verifies !== null) {
          const verifies = this._verifies;
          const i = verifies.push(op);
          await this._verified;
          return verifies[i] !== null;
        }
        this._verifies = [op];
        this._verified = this._verifyShared();
        return this._verified;
      }
      async reorg(batch, from) {
        if (!batch.commitable())
          return false;
        this.truncating++;
        await this._mutex.lock();
        try {
          if (!batch.commitable())
            return false;
          await this._truncate(batch, from);
        } finally {
          this.truncating--;
          this._mutex.unlock();
        }
        return true;
      }
      async _truncate(batch, from) {
        const entry = {
          userData: null,
          treeNodes: batch.nodes,
          treeUpgrade: batch,
          bitfield: {
            drop: true,
            start: batch.ancestors,
            length: this.tree.length - batch.ancestors
          }
        };
        await this.oplog.append([entry], false);
        this.bitfield.setRange(batch.ancestors, this.tree.length - batch.ancestors, false);
        addReorgHint(this.header.hints.reorgs, this.tree, batch);
        batch.commit();
        const appended = batch.length > batch.ancestors;
        this.header.tree.fork = batch.fork;
        this.header.tree.length = batch.length;
        this.header.tree.rootHash = batch.hash();
        this.header.tree.signature = batch.signature;
        this.onupdate(appended ? 3 : 2, entry.bitfield, null, from);
        await this._flushOplog();
      }
      async close() {
        await this._mutex.destroy();
        await Promise.allSettled([
          this.oplog.close(),
          this.bitfield.close(),
          this.tree.close(),
          this.blocks.close()
        ]);
      }
    };
    function addReorgHint(list, tree, batch) {
      if (tree.length === 0 || tree.fork === batch.fork)
        return;
      while (list.length >= 4)
        list.shift();
      while (list.length > 0) {
        if (list[list.length - 1].ancestors > batch.ancestors)
          list.pop();
        else
          break;
      }
      list.push({ from: tree.fork, to: batch.fork, ancestors: batch.ancestors });
    }
    function updateUserData(list, key, value) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].key === key) {
          if (value)
            list[i].value = value;
          else
            list.splice(i, 1);
          return;
        }
      }
      if (value)
        list.push({ key, value });
    }
    function noop() {
    }
  }
});

// node_modules/hypercore/lib/block-encryption.js
var require_block_encryption = __commonJS({
  "node_modules/hypercore/lib/block-encryption.js"(exports, module) {
    init_node_globals();
    var sodium = require_sodium_universal();
    var c = require_compact_encoding();
    var b4a = require_browser2();
    var nonce = b4a.alloc(sodium.crypto_stream_NONCEBYTES);
    module.exports = class BlockEncryption {
      constructor(encryptionKey, hypercoreKey) {
        const subKeys = b4a.alloc(2 * sodium.crypto_stream_KEYBYTES);
        this.key = encryptionKey;
        this.blockKey = subKeys.subarray(0, sodium.crypto_stream_KEYBYTES);
        this.blindingKey = subKeys.subarray(sodium.crypto_stream_KEYBYTES);
        this.padding = 8;
        sodium.crypto_generichash(this.blockKey, encryptionKey, hypercoreKey);
        sodium.crypto_generichash(this.blindingKey, this.blockKey);
      }
      encrypt(index, block, fork) {
        const padding = block.subarray(0, this.padding);
        block = block.subarray(this.padding);
        c.uint64.encode({ start: 0, end: 8, buffer: padding }, fork);
        c.uint64.encode({ start: 0, end: 8, buffer: nonce }, index);
        nonce.fill(0, 8, 8 + padding.byteLength);
        sodium.crypto_stream_xor(padding, padding, nonce, this.blindingKey);
        nonce.set(padding, 8);
        sodium.crypto_stream_xor(block, block, nonce, this.blockKey);
      }
      decrypt(index, block) {
        const padding = block.subarray(0, this.padding);
        block = block.subarray(this.padding);
        c.uint64.encode({ start: 0, end: 8, buffer: nonce }, index);
        nonce.set(padding, 8);
        sodium.crypto_stream_xor(block, block, nonce, this.blockKey);
      }
    };
  }
});

// node_modules/hypercore/lib/streams.js
var require_streams = __commonJS({
  "node_modules/hypercore/lib/streams.js"(exports) {
    init_node_globals();
    var { Writable, Readable } = require_streamx();
    var ReadStream = class extends Readable {
      constructor(core, opts = {}) {
        super();
        this.core = core;
        this.start = opts.start || 0;
        this.end = typeof opts.end === "number" ? opts.end : -1;
        this.snapshot = !opts.live && opts.snapshot !== false;
        this.live = !!opts.live;
      }
      _open(cb) {
        this._openP().then(cb, cb);
      }
      _read(cb) {
        this._readP().then(cb, cb);
      }
      async _openP() {
        if (this.end === -1)
          await this.core.update();
        else
          await this.core.ready();
        if (this.snapshot && this.end === -1)
          this.end = this.core.length;
      }
      async _readP() {
        const end = this.live ? -1 : this.end === -1 ? this.core.length : this.end;
        if (end >= 0 && this.start >= end) {
          this.push(null);
          return;
        }
        this.push(await this.core.get(this.start++));
      }
    };
    exports.ReadStream = ReadStream;
    var WriteStream = class extends Writable {
      constructor(core) {
        super();
        this.core = core;
      }
      _writev(batch, cb) {
        this._writevP(batch).then(cb, cb);
      }
      async _writevP(batch) {
        await this.core.append(batch);
      }
    };
    exports.WriteStream = WriteStream;
  }
});

// node_modules/hypercore/index.js
var require_hypercore = __commonJS({
  "node_modules/hypercore/index.js"(exports, module) {
    init_node_globals();
    var { EventEmitter } = require_events();
    var raf = require_browser3();
    var isOptions = require_is_options();
    var hypercoreCrypto = require_hypercore_crypto2();
    var c = require_compact_encoding();
    var b4a = require_browser2();
    var Xache = require_xache();
    var NoiseSecretStream = require_secret_stream();
    var codecs = require_codecs();
    var fsctl = requireMaybe("fsctl") || { lock: noop, sparse: noop };
    var Replicator = require_replicator();
    var Extensions = require_extensions();
    var Core = require_core();
    var BlockEncryption = require_block_encryption();
    var { ReadStream, WriteStream } = require_streams();
    var promises = Symbol.for("hypercore.promises");
    var inspect = Symbol.for("nodejs.util.inspect.custom");
    module.exports = class Hypercore extends EventEmitter {
      constructor(storage, key, opts) {
        super();
        if (isOptions(storage)) {
          opts = storage;
          storage = null;
          key = null;
        } else if (isOptions(key)) {
          opts = key;
          key = null;
        }
        if (key && typeof key === "string") {
          key = b4a.from(key, "hex");
        }
        if (!opts)
          opts = {};
        if (!opts.crypto && key && key.byteLength !== 32) {
          throw new Error("Hypercore key should be 32 bytes");
        }
        if (!storage)
          storage = opts.storage;
        this[promises] = true;
        this.storage = null;
        this.crypto = opts.crypto || hypercoreCrypto;
        this.core = null;
        this.replicator = null;
        this.encryption = null;
        this.extensions = opts.extensions || new Extensions();
        this.cache = opts.cache === true ? new Xache({ maxSize: 65536, maxAge: 0 }) : opts.cache || null;
        this.valueEncoding = null;
        this.encodeBatch = null;
        this.key = key || null;
        this.keyPair = null;
        this.discoveryKey = null;
        this.readable = true;
        this.writable = false;
        this.opened = false;
        this.closed = false;
        this.sessions = opts._sessions || [this];
        this.sign = opts.sign || null;
        this.autoClose = !!opts.autoClose;
        this.closing = null;
        this.opening = this._openSession(key, storage, opts);
        this.opening.catch(noop);
        this._preappend = preappend.bind(this);
      }
      [inspect](depth, opts) {
        let indent = "";
        if (typeof opts.indentationLvl === "number") {
          while (indent.length < opts.indentationLvl)
            indent += " ";
        }
        return this.constructor.name + "(\n" + indent + "  key: " + opts.stylize(toHex(this.key), "string") + "\n" + indent + "  discoveryKey: " + opts.stylize(toHex(this.discoveryKey), "string") + "\n" + indent + "  opened: " + opts.stylize(this.opened, "boolean") + "\n" + indent + "  writable: " + opts.stylize(this.writable, "boolean") + "\n" + indent + "  sessions: " + opts.stylize(this.sessions.length, "number") + "\n" + indent + "  peers: [ " + opts.stylize(this.peers.length, "number") + " ]\n" + indent + "  length: " + opts.stylize(this.length, "number") + "\n" + indent + "  byteLength: " + opts.stylize(this.byteLength, "number") + "\n" + indent + ")";
      }
      static createProtocolStream(isInitiator, opts = {}) {
        let outerStream = isStream(isInitiator) ? isInitiator : opts.stream;
        let noiseStream = null;
        if (outerStream) {
          noiseStream = outerStream.noiseStream;
        } else {
          noiseStream = new NoiseSecretStream(isInitiator, null, opts);
          outerStream = noiseStream.rawStream;
        }
        if (!noiseStream)
          throw new Error("Invalid stream");
        if (!noiseStream.userData) {
          const protocol = Replicator.createProtocol(noiseStream, opts);
          if (opts.keepAlive !== false)
            protocol.setKeepAlive(true);
          noiseStream.userData = protocol;
          noiseStream.on("error", noop);
        }
        return outerStream;
      }
      static defaultStorage(storage, opts = {}) {
        if (typeof storage !== "string")
          return storage;
        const directory = storage;
        const toLock = opts.lock || "oplog";
        return function createFile(name) {
          const locked = name === toLock || name.endsWith("/" + toLock);
          const lock = locked ? fsctl.lock : null;
          const sparse = locked ? null : null;
          return raf(name, { directory, lock, sparse });
        };
      }
      session(opts = {}) {
        if (this.closing) {
          throw new Error("Cannot make sessions on a closing core");
        }
        const Clz = opts.class || Hypercore;
        const s = new Clz(this.storage, this.key, {
          ...opts,
          extensions: this.extensions,
          _opening: this.opening,
          _sessions: this.sessions
        });
        s._passCapabilities(this);
        this.sessions.push(s);
        return s;
      }
      _passCapabilities(o) {
        if (!this.sign)
          this.sign = o.sign;
        this.crypto = o.crypto;
        this.key = o.key;
        this.discoveryKey = o.discoveryKey;
        this.core = o.core;
        this.replicator = o.replicator;
        this.encryption = o.encryption;
        this.writable = !!this.sign;
        this.autoClose = o.autoClose;
      }
      async _openFromExisting(from, opts) {
        await from.opening;
        for (const [name, ext] of this.extensions) {
          from.extensions.register(name, null, ext);
        }
        this._passCapabilities(from);
        this.extensions = from.extensions;
        this.sessions = from.sessions;
        this.storage = from.storage;
        this.sessions.push(this);
      }
      async _openSession(key, storage, opts) {
        const isFirst = !opts._opening;
        if (!isFirst)
          await opts._opening;
        if (opts.preload)
          opts = { ...opts, ...await opts.preload() };
        const keyPair = key && opts.keyPair ? { ...opts.keyPair, publicKey: key } : key ? { publicKey: key, secretKey: null } : opts.keyPair;
        if (this.key && keyPair)
          keyPair.publicKey = this.key;
        if (opts.sign) {
          this.sign = opts.sign;
        } else if (keyPair && keyPair.secretKey) {
          this.sign = Core.createSigner(this.crypto, keyPair);
        }
        if (isFirst) {
          await this._openCapabilities(keyPair, storage, opts);
          for (let i = 0; i < this.sessions.length; i++) {
            const s = this.sessions[i];
            if (s !== this)
              s._passCapabilities(this);
          }
        }
        if (!this.sign)
          this.sign = this.core.defaultSign;
        this.writable = !!this.sign;
        if (opts.valueEncoding) {
          this.valueEncoding = c.from(codecs(opts.valueEncoding));
        }
        if (opts.encodeBatch) {
          this.encodeBatch = opts.encodeBatch;
        }
        if (opts._preready)
          await opts._preready(this);
        this.opened = true;
        this.emit("ready");
      }
      async _openCapabilities(keyPair, storage, opts) {
        if (opts.from)
          return this._openFromExisting(opts.from, opts);
        this.storage = Hypercore.defaultStorage(opts.storage || storage);
        this.core = await Core.open(this.storage, {
          createIfMissing: opts.createIfMissing,
          overwrite: opts.overwrite,
          keyPair,
          crypto: this.crypto,
          onupdate: this._oncoreupdate.bind(this)
        });
        if (opts.userData) {
          for (const [key, value] of Object.entries(opts.userData)) {
            await this.core.userData(key, value);
          }
        }
        this.replicator = new Replicator(this.core, {
          onupdate: this._onpeerupdate.bind(this),
          onupload: this._onupload.bind(this)
        });
        this.discoveryKey = this.crypto.discoveryKey(this.core.header.signer.publicKey);
        this.key = this.core.header.signer.publicKey;
        this.keyPair = this.core.header.signer;
        if (!this.encryption && opts.encryptionKey) {
          this.encryption = new BlockEncryption(opts.encryptionKey, this.key);
        }
        this.extensions.attach(this.replicator);
      }
      close() {
        if (this.closing)
          return this.closing;
        this.closing = this._close();
        return this.closing;
      }
      async _close() {
        await this.opening;
        const i = this.sessions.indexOf(this);
        if (i === -1)
          return;
        this.sessions.splice(i, 1);
        this.readable = false;
        this.writable = false;
        this.closed = true;
        if (this.sessions.length) {
          if (this.sessions.length === 1 && this.autoClose)
            await this.sessions[0].close();
          this.emit("close", false);
          return;
        }
        await this.core.close();
        this.emit("close", true);
      }
      replicate(isInitiator, opts = {}) {
        const protocolStream = Hypercore.createProtocolStream(isInitiator, opts);
        const noiseStream = protocolStream.noiseStream;
        const protocol = noiseStream.userData;
        if (this.opened) {
          this.replicator.joinProtocol(protocol, this.key, this.discoveryKey);
        } else {
          this.opening.then(() => this.replicator.joinProtocol(protocol, this.key, this.discoveryKey), protocol.destroy.bind(protocol));
        }
        return protocolStream;
      }
      get length() {
        return this.core === null ? 0 : this.core.tree.length;
      }
      get byteLength() {
        return this.core === null ? 0 : this.core.tree.byteLength - this.core.tree.length * this.padding;
      }
      get fork() {
        return this.core === null ? 0 : this.core.tree.fork;
      }
      get peers() {
        return this.replicator === null ? [] : this.replicator.peers;
      }
      get encryptionKey() {
        return this.encryption && this.encryption.key;
      }
      get padding() {
        return this.encryption === null ? 0 : this.encryption.padding;
      }
      ready() {
        return this.opening;
      }
      _onupload(index, value, from) {
        const byteLength = value.byteLength - this.padding;
        for (let i = 0; i < this.sessions.length; i++) {
          this.sessions[i].emit("upload", index, byteLength, from);
        }
      }
      _oncoreupdate(status, bitfield, value, from) {
        if (status !== 0) {
          for (let i = 0; i < this.sessions.length; i++) {
            if ((status & 2) !== 0) {
              if (this.cache)
                this.cache.clear();
              this.sessions[i].emit("truncate", bitfield.start, this.core.tree.fork);
            }
            if ((status & 1) !== 0) {
              this.sessions[i].emit("append");
            }
          }
          this.replicator.broadcastInfo();
        }
        if (bitfield && !bitfield.drop) {
          for (let i = 0; i < bitfield.length; i++) {
            this.replicator.broadcastBlock(bitfield.start + i);
          }
        }
        if (value) {
          const byteLength = value.byteLength - this.padding;
          for (let i = 0; i < this.sessions.length; i++) {
            this.sessions[i].emit("download", bitfield.start, byteLength, from);
          }
        }
      }
      _onpeerupdate(added, peer) {
        if (added)
          this.extensions.update(peer);
        const name = added ? "peer-add" : "peer-remove";
        for (let i = 0; i < this.sessions.length; i++) {
          this.sessions[i].emit(name, peer);
        }
      }
      async setUserData(key, value) {
        if (this.opened === false)
          await this.opening;
        return this.core.userData(key, value);
      }
      async getUserData(key) {
        if (this.opened === false)
          await this.opening;
        for (const { key: savedKey, value } of this.core.header.userData) {
          if (key === savedKey)
            return value;
        }
        return null;
      }
      async update() {
        if (this.opened === false)
          await this.opening;
        if (this.writable)
          return false;
        return this.replicator.requestUpgrade();
      }
      async seek(bytes) {
        if (this.opened === false)
          await this.opening;
        const s = this.core.tree.seek(bytes, this.padding);
        return await s.update() || this.replicator.requestSeek(s);
      }
      async has(index) {
        if (this.opened === false)
          await this.opening;
        return this.core.bitfield.get(index);
      }
      async get(index, opts) {
        if (this.opened === false)
          await this.opening;
        const c2 = this.cache && this.cache.get(index);
        if (c2)
          return c2;
        const fork = this.core.tree.fork;
        const b = await this._get(index, opts);
        if (this.cache && fork === this.core.tree.fork && b)
          this.cache.set(index, b);
        return b;
      }
      async _get(index, opts) {
        const encoding = opts && opts.valueEncoding && c.from(codecs(opts.valueEncoding)) || this.valueEncoding;
        let block;
        if (this.core.bitfield.get(index)) {
          block = await this.core.blocks.get(index);
        } else {
          if (opts && opts.wait === false)
            return null;
          if (opts && opts.onwait)
            opts.onwait(index);
          block = await this.replicator.requestBlock(index);
        }
        if (this.encryption)
          this.encryption.decrypt(index, block);
        return this._decode(encoding, block);
      }
      createReadStream(opts) {
        return new ReadStream(this, opts);
      }
      createWriteStream(opts) {
        return new WriteStream(this, opts);
      }
      download(range) {
        const linear = !!(range && range.linear);
        let start;
        let end;
        let filter;
        if (range && range.blocks) {
          const blocks = range.blocks instanceof Set ? range.blocks : new Set(range.blocks);
          start = range.start || (blocks.size ? min(range.blocks) : 0);
          end = range.end || (blocks.size ? max(range.blocks) + 1 : 0);
          filter = (i) => blocks.has(i);
        } else {
          start = range && range.start || 0;
          end = typeof (range && range.end) === "number" ? range.end : -1;
        }
        const r = Replicator.createRange(start, end, filter, linear);
        if (this.opened)
          this.replicator.addRange(r);
        else
          this.opening.then(() => this.replicator.addRange(r), noop);
        return r;
      }
      cancel(request) {
      }
      undownload(range) {
        range.destroy(null);
      }
      async truncate(newLength = 0, fork = -1) {
        if (this.opened === false)
          await this.opening;
        if (this.writable === false)
          throw new Error("Core is not writable");
        if (fork === -1)
          fork = this.core.tree.fork + 1;
        await this.core.truncate(newLength, fork, this.sign);
        this.replicator.updateAll();
      }
      async append(blocks) {
        if (this.opened === false)
          await this.opening;
        if (this.writable === false)
          throw new Error("Core is not writable");
        blocks = Array.isArray(blocks) ? blocks : [blocks];
        const preappend2 = this.encryption && this._preappend;
        const buffers = this.encodeBatch !== null ? this.encodeBatch(blocks) : new Array(blocks.length);
        if (this.encodeBatch === null) {
          for (let i = 0; i < blocks.length; i++) {
            buffers[i] = this._encode(this.valueEncoding, blocks[i]);
          }
        }
        return await this.core.append(buffers, this.sign, { preappend: preappend2 });
      }
      registerExtension(name, handlers) {
        return this.extensions.register(name, handlers);
      }
      onextensionupdate() {
        if (this.replicator !== null)
          this.replicator.broadcastOptions();
      }
      _encode(enc, val2) {
        const state = { start: this.padding, end: this.padding, buffer: null };
        if (b4a.isBuffer(val2)) {
          if (state.start === 0)
            return val2;
          state.end += val2.byteLength;
        } else if (enc) {
          enc.preencode(state, val2);
        } else {
          val2 = b4a.from(val2);
          if (state.start === 0)
            return val2;
          state.end += val2.byteLength;
        }
        state.buffer = b4a.allocUnsafe(state.end);
        if (enc)
          enc.encode(state, val2);
        else
          state.buffer.set(val2, state.start);
        return state.buffer;
      }
      _decode(enc, block) {
        block = block.subarray(this.padding);
        if (enc)
          return c.decode(enc, block);
        return block;
      }
    };
    function noop() {
    }
    function isStream(s) {
      return typeof s === "object" && s && typeof s.pipe === "function";
    }
    function requireMaybe(name) {
      try {
        return __require(name);
      } catch (_) {
        return null;
      }
    }
    function toHex(buf) {
      return buf && b4a.toString(buf, "hex");
    }
    function reduce(iter, fn, acc) {
      for (const item of iter)
        acc = fn(acc, item);
      return acc;
    }
    function min(arr) {
      return reduce(arr, (a, b) => Math.min(a, b), Infinity);
    }
    function max(arr) {
      return reduce(arr, (a, b) => Math.max(a, b), -Infinity);
    }
    function preappend(blocks) {
      const offset = this.core.tree.length;
      const fork = this.core.tree.fork;
      for (let i = 0; i < blocks.length; i++) {
        this.encryption.encrypt(offset + i, blocks[i], fork);
      }
    }
  }
});

// node_modules/blake2b-universal/browser.js
var require_browser4 = __commonJS({
  "node_modules/blake2b-universal/browser.js"(exports, module) {
    init_node_globals();
    var blake2b = require_blake2b2();
    module.exports = function(out, data, key) {
      blake2b(out.length, key).update(data).digest(out);
    };
    module.exports.batch = function(out, batch, key) {
      const b = blake2b(out.length, key);
      for (let i = 0; i < batch.length; i++)
        b.update(batch[i]);
      b.digest(out);
    };
  }
});

// node_modules/corestore/lib/keys.js
var require_keys = __commonJS({
  "node_modules/corestore/lib/keys.js"(exports, module) {
    init_node_globals();
    var sodium = require_sodium_universal();
    var blake2b = require_browser4();
    var DEFAULT_TOKEN = Buffer2.alloc(0);
    var NAMESPACE = Buffer2.from("@hyperspace/key-manager");
    module.exports = class KeyManager {
      constructor(storage, profile, opts = {}) {
        this.storage = storage;
        this.profile = profile;
      }
      _sign(keyPair, message) {
        if (!keyPair._secretKey)
          throw new Error("Invalid key pair");
        const signature = Buffer2.allocUnsafe(sodium.crypto_sign_BYTES);
        sodium.crypto_sign_detached(signature, message, keyPair._secretKey);
        return signature;
      }
      createSecret(name, token) {
        return deriveSeed(this.profile, token, name);
      }
      createHypercoreKeyPair(name, token) {
        const keyPair = {
          publicKey: Buffer2.allocUnsafe(sodium.crypto_sign_PUBLICKEYBYTES),
          _secretKey: Buffer2.alloc(sodium.crypto_sign_SECRETKEYBYTES),
          sign: (msg) => this._sign(keyPair, msg)
        };
        sodium.crypto_sign_seed_keypair(keyPair.publicKey, keyPair._secretKey, this.createSecret(name, token));
        return keyPair;
      }
      createNetworkIdentity(name, token) {
        const keyPair = {
          publicKey: Buffer2.alloc(32),
          secretKey: Buffer2.alloc(64)
        };
        sodium.crypto_sign_seed_keypair(keyPair.publicKey, keyPair.secretKey, this.createSecret(name, token));
        return keyPair;
      }
      close() {
        return new Promise((resolve, reject) => {
          this.storage.close((err) => {
            if (err)
              return reject(err);
            return resolve();
          });
        });
      }
      static createToken() {
        return randomBytes(32);
      }
      static async fromStorage(storage, opts = {}) {
        const profileStorage = storage(opts.name || "default");
        const profile = await new Promise((resolve, reject) => {
          profileStorage.stat((err, st) => {
            if (err && err.code !== "ENOENT")
              return reject(err);
            if (err || st.size < 32 || opts.overwrite) {
              const key = randomBytes(32);
              return profileStorage.write(0, key, (err2) => {
                if (err2)
                  return reject(err2);
                return resolve(key);
              });
            }
            profileStorage.read(0, 32, (err2, key) => {
              if (err2)
                return reject(err2);
              return resolve(key);
            });
          });
        });
        return new this(profileStorage, profile, opts);
      }
    };
    function deriveSeed(profile, token, name, output) {
      if (token && token.length < 32)
        throw new Error("Token must be a Buffer with length >= 32");
      if (!name || typeof name !== "string")
        throw new Error("name must be a String");
      if (!output)
        output = Buffer2.alloc(32);
      blake2b.batch(output, [
        NAMESPACE,
        token || DEFAULT_TOKEN,
        Buffer2.from(Buffer2.byteLength(name, "ascii") + "\n" + name, "ascii")
      ], profile);
      return output;
    }
    function randomBytes(n) {
      const buf = Buffer2.allocUnsafe(n);
      sodium.randombytes_buf(buf);
      return buf;
    }
  }
});

// node_modules/corestore/index.js
var require_corestore = __commonJS({
  "node_modules/corestore/index.js"(exports, module) {
    init_node_globals();
    var { EventEmitter } = require_events();
    var safetyCatch = require_safety_catch();
    var crypto = require_hypercore_crypto();
    var sodium = require_sodium_universal();
    var Hypercore = require_hypercore();
    var KeyManager = require_keys();
    var CORES_DIR = "cores";
    var PROFILES_DIR = "profiles";
    var USERDATA_NAME_KEY = "@corestore/name";
    var USERDATA_NAMESPACE_KEY = "@corestore/namespace";
    var DEFAULT_NAMESPACE = generateNamespace("@corestore/default");
    module.exports = class Corestore extends EventEmitter {
      constructor(storage, opts = {}) {
        super();
        this.storage = Hypercore.defaultStorage(storage, { lock: PROFILES_DIR + "/default" });
        this.cores = opts._cores || /* @__PURE__ */ new Map();
        this.keys = opts.keys;
        this._namespace = opts._namespace || DEFAULT_NAMESPACE;
        this._replicationStreams = opts._streams || [];
        this._opening = opts._opening ? opts._opening.then(() => this._open()) : this._open();
        this._opening.catch(noop);
        this.ready = () => this._opening;
      }
      async _open() {
        if (this.keys) {
          this.keys = await this.keys;
        } else {
          this.keys = await KeyManager.fromStorage((p) => this.storage(PROFILES_DIR + "/" + p));
        }
      }
      async _generateKeys(opts) {
        if (opts._discoveryKey) {
          return {
            keyPair: null,
            sign: null,
            discoveryKey: opts._discoveryKey
          };
        }
        if (!opts.name) {
          return {
            keyPair: {
              publicKey: opts.publicKey,
              secretKey: opts.secretKey
            },
            sign: opts.sign,
            discoveryKey: crypto.discoveryKey(opts.publicKey)
          };
        }
        const { publicKey, sign } = await this.keys.createHypercoreKeyPair(opts.name, this._namespace);
        return {
          keyPair: {
            publicKey,
            secretKey: null
          },
          sign,
          discoveryKey: crypto.discoveryKey(publicKey)
        };
      }
      _getPrereadyUserData(core, key) {
        for (const { key: savedKey, value } of core.core.header.userData) {
          if (key === savedKey)
            return value;
        }
        return null;
      }
      async _preready(core) {
        const name = this._getPrereadyUserData(core, USERDATA_NAME_KEY);
        if (!name)
          return;
        const namespace = this._getPrereadyUserData(core, USERDATA_NAMESPACE_KEY);
        const { publicKey, sign } = await this.keys.createHypercoreKeyPair(name.toString(), namespace);
        if (!publicKey.equals(core.key))
          throw new Error("Stored core key does not match the provided name");
        core.sign = sign;
        core.key = publicKey;
        core.writable = true;
      }
      async _preload(opts) {
        await this.ready();
        const { discoveryKey, keyPair, sign } = await this._generateKeys(opts);
        const id = discoveryKey.toString("hex");
        while (this.cores.has(id)) {
          const existing = this.cores.get(id);
          if (existing.opened && !existing.closing)
            return { from: existing, keyPair, sign };
          if (!existing.opened) {
            await existing.ready().catch(safetyCatch);
          } else if (existing.closing) {
            await existing.close();
          }
        }
        const userData = {};
        if (opts.name) {
          userData[USERDATA_NAME_KEY] = Buffer2.from(opts.name);
          userData[USERDATA_NAMESPACE_KEY] = this._namespace;
        }
        const storageRoot = [CORES_DIR, id.slice(0, 2), id.slice(2, 4), id].join("/");
        const core = new Hypercore((p) => this.storage(storageRoot + "/" + p), {
          _preready: this._preready.bind(this),
          autoClose: true,
          encryptionKey: opts.encryptionKey || null,
          userData,
          sign: null,
          createIfMissing: !opts._discoveryKey,
          keyPair: keyPair && keyPair.publicKey ? {
            publicKey: keyPair.publicKey,
            secretKey: null
          } : null
        });
        this.cores.set(id, core);
        core.ready().then(() => {
          for (const { stream } of this._replicationStreams) {
            core.replicate(stream);
          }
        }, () => {
          this.cores.delete(id);
        });
        core.once("close", () => {
          this.cores.delete(id);
        });
        return { from: core, keyPair, sign };
      }
      get(opts = {}) {
        opts = validateGetOptions(opts);
        const core = new Hypercore(null, {
          ...opts,
          name: null,
          preload: () => this._preload(opts)
        });
        return core;
      }
      replicate(isInitiator, opts) {
        const isExternal = isStream(isInitiator) || !!(opts && opts.stream);
        const stream = Hypercore.createProtocolStream(isInitiator, {
          ...opts,
          ondiscoverykey: (discoveryKey) => {
            const core = this.get({ _discoveryKey: discoveryKey });
            return core.ready().catch(safetyCatch);
          }
        });
        for (const core of this.cores.values()) {
          if (core.opened)
            core.replicate(stream);
        }
        const streamRecord = { stream, isExternal };
        this._replicationStreams.push(streamRecord);
        stream.once("close", () => {
          this._replicationStreams.splice(this._replicationStreams.indexOf(streamRecord), 1);
        });
        return stream;
      }
      namespace(name) {
        if (!Buffer2.isBuffer(name))
          name = Buffer2.from(name);
        return new Corestore(this.storage, {
          _namespace: generateNamespace(this._namespace, name),
          _opening: this._opening,
          _cores: this.cores,
          _streams: this._replicationStreams,
          keys: this._opening.then(() => this.keys)
        });
      }
      async _close() {
        if (this._closing)
          return this._closing;
        await this._opening;
        const closePromises = [];
        for (const core of this.cores.values()) {
          closePromises.push(core.close());
        }
        await Promise.allSettled(closePromises);
        for (const { stream, isExternal } of this._replicationStreams) {
          if (!isExternal)
            stream.destroy();
        }
        await this.keys.close();
      }
      close() {
        if (this._closing)
          return this._closing;
        this._closing = this._close();
        this._closing.catch(noop);
        return this._closing;
      }
      static createToken() {
        return KeyManager.createToken();
      }
    };
    function validateGetOptions(opts) {
      if (Buffer2.isBuffer(opts))
        return { key: opts, publicKey: opts };
      if (opts.key) {
        opts.publicKey = opts.key;
      }
      if (opts.keyPair) {
        opts.publicKey = opts.keyPair.publicKey;
        opts.secretKey = opts.keyPair.secretKey;
      }
      if (opts.name && typeof opts.name !== "string")
        throw new Error("name option must be a String");
      if (opts.name && opts.secretKey)
        throw new Error("Cannot provide both a name and a secret key");
      if (opts.publicKey && !Buffer2.isBuffer(opts.publicKey))
        throw new Error("publicKey option must be a Buffer");
      if (opts.secretKey && !Buffer2.isBuffer(opts.secretKey))
        throw new Error("secretKey option must be a Buffer");
      if (!opts._discoveryKey && (!opts.name && !opts.publicKey))
        throw new Error("Must provide either a name or a publicKey");
      return opts;
    }
    function generateNamespace(first, second) {
      if (!Buffer2.isBuffer(first))
        first = Buffer2.from(first);
      if (second && !Buffer2.isBuffer(second))
        second = Buffer2.from(second);
      const out = Buffer2.allocUnsafe(32);
      sodium.crypto_generichash(out, second ? Buffer2.concat([first, second]) : first);
      return out;
    }
    function isStream(s) {
      return typeof s === "object" && s && typeof s.pipe === "function";
    }
    function noop() {
    }
  }
});
export default require_corestore();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
