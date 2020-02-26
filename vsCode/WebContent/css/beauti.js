(function (a) {
        if (typeof define === "function" && define.amd) {
            define(["jquery"], a)
        } else {
            a(jQuery)
        }
    }
    (function (b, e) {
        var a = 0,
            d = Array.prototype.slice,
            c = b.cleanData;
        b.cleanData = function (f) {
            for (var g = 0, h;
                (h = f[g]) != null; g++) {
                try {
                    b(h).triggerHandler("remove")
                } catch (j) {}
            }
            c(f)
        };
        b.widget = function (g, k, f) {
            var n, m, j, l, h = g.split(".")[0];
            g = g.split(".")[1];
            n = h + "-" + g;
            if (!f) {
                f = k;
                k = b.Widget
            }
            b.expr[":"][n.toLowerCase()] = function (o) {
                return !!b.data(o, n)
            };
            b[h] = b[h] || {};
            m = b[h][g];
            j = b[h][g] = function (o, p) {
                if (!this._createWidget) {
                    return new j(o, p)
                }
                if (arguments.length) {
                    this._createWidget(o, p)
                }
            };
            b.extend(j, m, {
                version: f.version,
                _proto: b.extend({}, f),
                _childConstructors: []
            });
            l = new k();
            l.options = b.widget.extend({}, l.options);
            b.each(f, function (p, o) {
                if (b.isFunction(o)) {
                    f[p] = (function () {
                        var q = function () {
                                return k.prototype[p].apply(this, arguments)
                            },
                            r = function (s) {
                                return k.prototype[p].apply(this, s)
                            };
                        return function () {
                            var u = this._super,
                                s = this._superApply,
                                t;
                            this._super = q;
                            this._superApply = r;
                            t = o.apply(this, arguments);
                            this._super = u;
                            this._superApply = s;
                            return t
                        }
                    })()
                }
            });
            j.prototype = b.widget.extend(l, {
                widgetEventPrefix: l.widgetEventPrefix || g
            }, f, {
                constructor: j,
                namespace: h,
                widgetName: g,
                widgetBaseClass: n,
                widgetFullName: n
            });
            if (m) {
                b.each(m._childConstructors, function (p, q) {
                    var o = q.prototype;
                    b.widget(o.namespace + "." + o.widgetName, j, q._proto)
                });
                delete m._childConstructors
            } else {
                k._childConstructors.push(j)
            }
            b.widget.bridge(g, j)
        };
        b.widget.extend = function (l) {
            var g = d.call(arguments, 1),
                k = 0,
                f = g.length,
                h, j;
            for (; k < f; k++) {
                for (h in g[k]) {
                    j = g[k][h];
                    if (g[k].hasOwnProperty(h) && j !== e) {
                        if (b.isPlainObject(j)) {
                            l[h] = b.isPlainObject(l[h]) ? b.widget.extend({}, l[h], j) : b.widget.extend({}, j)
                        } else {
                            l[h] = j
                        }
                    }
                }
            }
            return l
        };
        b.widget.bridge = function (g, f) {
            var h = f.prototype.widgetFullName;
            b.fn[g] = function (l) {
                var j = typeof l === "string",
                    k = d.call(arguments, 1),
                    m = this;
                l = !j && k.length ? b.widget.extend.apply(null, [l].concat(k)) : l;
                if (j) {
                    this.each(function () {
                        var o, n = b.data(this, h);
                        if (!n) {
                            return b.error("cannot call methods on " + g + " prior to initialization; attempted to call method '" + l + "'")
                        }
                        if (!b.isFunction(n[l]) || l.charAt(0) === "_") {
                            return b.error("no such method '" + l + "' for " + g + " widget instance")
                        }
                        o = n[l].apply(n, k);
                        if (o !== n && o !== e) {
                            m = o && o.jquery ? m.pushStack(o.get()) : o;
                            return false
                        }
                    })
                } else {
                    this.each(function () {
                        var n = b.data(this, h);
                        if (n) {
                            n.option(l || {})._init()
                        } else {
                            new f(l, this)
                        }
                    })
                }
                return m
            }
        };
        b.Widget = function () {};
        b.Widget._childConstructors = [];
        b.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: false,
                create: null
            },
            _createWidget: function (f, g) {
                g = b(g || this.defaultElement || this)[0];
                this.element = b(g);
                this.uuid = a++;
                this.eventNamespace = "." + this.widgetName + this.uuid;
                this.options = b.widget.extend({}, this.options, this._getCreateOptions(), f);
                this.bindings = b();
                this.hoverable = b();
                this.focusable = b();
                if (g !== this) {
                    b.data(g, this.widgetName, this);
                    b.data(g, this.widgetFullName, this);
                    this._on(this.element, {
                        remove: function (h) {
                            if (h.target === g) {
                                this.destroy()
                            }
                        }
                    });
                    this.document = b(g.style ? g.ownerDocument : g.document || g);
                    this.window = b(this.document[0].defaultView || this.document[0].parentWindow)
                }
                this._create();
                this._trigger("create", null, this._getCreateEventData());
                this._init()
            },
            _getCreateOptions: b.noop,
            _getCreateEventData: b.noop,
            _create: b.noop,
            _init: b.noop,
            destroy: function () {
                this._destroy();
                this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(b.camelCase(this.widgetFullName));
                this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
                this.bindings.unbind(this.eventNamespace);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus")
            },
            _destroy: b.noop,
            widget: function () {
                return this.element
            },
            option: function (j, k) {
                var f = j,
                    l, h, g;
                if (arguments.length === 0) {
                    return b.widget.extend({}, this.options)
                }
                if (typeof j === "string") {
                    f = {};
                    l = j.split(".");
                    j = l.shift();
                    if (l.length) {
                        h = f[j] = b.widget.extend({}, this.options[j]);
                        for (g = 0; g < l.length - 1; g++) {
                            h[l[g]] = h[l[g]] || {};
                            h = h[l[g]]
                        }
                        j = l.pop();
                        if (k === e) {
                            return h[j] === e ? null : h[j]
                        }
                        h[j] = k
                    } else {
                        if (k === e) {
                            return this.options[j] === e ? null : this.options[j]
                        }
                        f[j] = k
                    }
                }
                this._setOptions(f);
                return this
            },
            _setOptions: function (f) {
                var g;
                for (g in f) {
                    this._setOption(g, f[g])
                }
                return this
            },
            _setOption: function (f, g) {
                this.options[f] = g;
                if (f === "disabled") {
                    this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!g).attr("aria-disabled", g);
                    this.hoverable.removeClass("ui-state-hover");
                    this.focusable.removeClass("ui-state-focus")
                }
                return this
            },
            enable: function () {
                return this._setOption("disabled", false)
            },
            disable: function () {
                return this._setOption("disabled", true)
            },
            _on: function (h, g) {
                var j, f = this;
                if (!g) {
                    g = h;
                    h = this.element;
                    j = this.widget()
                } else {
                    h = j = b(h);
                    this.bindings = this.bindings.add(h)
                }
                b.each(g, function (p, o) {
                    function m() {
                        if (f.options.disabled === true || b(this).hasClass("ui-state-disabled")) {
                            return
                        }
                        return (typeof o === "string" ? f[o] : o).apply(f, arguments)
                    }
                    if (typeof o !== "string") {
                        m.guid = o.guid = o.guid || m.guid || b.guid++
                    }
                    var n = p.match(/^(\w+)\s*(.*)$/),
                        l = n[1] + f.eventNamespace,
                        k = n[2];
                    if (k) {
                        j.delegate(k, l, m)
                    } else {
                        h.bind(l, m)
                    }
                })
            },
            _off: function (g, f) {
                f = (f || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
                g.unbind(f).undelegate(f)
            },
            _delay: function (j, h) {
                function g() {
                    return (typeof j === "string" ? f[j] : j).apply(f, arguments)
                }
                var f = this;
                return setTimeout(g, h || 0)
            },
            _hoverable: function (f) {
                this.hoverable = this.hoverable.add(f);
                this._on(f, {
                    mouseenter: function (g) {
                        b(g.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function (g) {
                        b(g.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function (f) {
                this.focusable = this.focusable.add(f);
                this._on(f, {
                    focusin: function (g) {
                        b(g.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function (g) {
                        b(g.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function (f, g, h) {
                var l, k, j = this.options[f];
                h = h || {};
                g = b.Event(g);
                g.type = (f === this.widgetEventPrefix ? f : this.widgetEventPrefix + f).toLowerCase();
                g.target = this.element[0];
                k = g.originalEvent;
                if (k) {
                    for (l in k) {
                        if (!(l in g)) {
                            g[l] = k[l]
                        }
                    }
                }
                this.element.trigger(g, h);
                return !(b.isFunction(j) && j.apply(this.element[0], [g].concat(h)) === false || g.isDefaultPrevented())
            }
        };
        b.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function (g, f) {
            b.Widget.prototype["_" + g] = function (k, j, m) {
                if (typeof j === "string") {
                    j = {
                        effect: j
                    }
                }
                var l, h = !j ? g : j === true || typeof j === "number" ? f : j.effect || f;
                j = j || {};
                if (typeof j === "number") {
                    j = {
                        duration: j
                    }
                }
                l = !b.isEmptyObject(j);
                j.complete = m;
                if (j.delay) {
                    k.delay(j.delay)
                }
                if (l && b.effects && (b.effects.effect[h] || b.uiBackCompat !== false && b.effects[h])) {
                    k[g](j)
                } else {
                    if (h !== g && k[h]) {
                        k[h](j.duration, j.easing, m)
                    } else {
                        k.queue(function (n) {
                            b(this)[g]();
                            if (m) {
                                m.call(k[0])
                            }
                            n()
                        })
                    }
                }
            }
        });
        if (b.uiBackCompat !== false) {
            b.Widget.prototype._getCreateOptions = function () {
                return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
            }
        }
    }));

function unlock() {
    $("input[name='check']", $("form[name='check_attack']")).val(0)
}

function check_submit(a) {
    if ($("input[name='check']", $("form[name='check_attack']")).val() == 1) {
        alert("湲��곌린 踰꾪듉�� �щ윭踰� �꾨Ⅴ�쒕㈃ �덈맗�덈떎");
        return false
    }
    obj = $("form[name='write']");
    if ($("input[name=subject]", obj)) {
        if (!$("input[name=subject]", obj).val()) {
            alert("�쒕ぉ�� �낅젰�섏뿬 二쇱꽭��.");
            $("input[name=subject]", obj).focus();
            return false
        }
    }
    if ($("textarea[name=memo]", obj)) {
        if (!$("textarea[name=memo]", obj).val()) {
            alert("�댁슜�� �낅젰�섏뿬 二쇱꽭��.");
            $("input[textarea=memo]", obj).focus();
            return false
        }
    }
    $("input[name='check']", $("form[name='check_attack']")).val(1);
    if (obj.data("chainEvt")) {
        rt = obj.data("chainEvt");
        rs = rt();
        return false
    }
    if (a == true) {
        return true
    } else {
        $.ajax({
            url: "/bbs/posting.php",
            data: obj.serialize(),
            type: "POST",
            success: function (b) {
                obj.append($(document.createElement("div")).attr("id", "postback"));
                $("#postback").html(b);
                $("input[name='check']", $("form[name='check_attack']")).val(0)
            },
            error: function (b) {
                alert("�묒꽦�곗씠�� �꾩넚以� �ㅻ쪟媛� 諛쒖깮�섏��듬땲��.");
                $("input[name='check']", $("form[name='check_attack']")).val(0)
            }
        });
        return false
    }
}

function view_preview() {
    obj = $("form[name='write']");
    if ($("input[name='id']", obj) && $("input[name='id']", obj).val() != "") {
        if (bbst == "pc") {
            obj.attr("action", "bbs_preview.php?id=" + $("input[name='id']", obj).val() + "&estimateUrl=" + $("input[name='estimateUrl']", obj).val())
        } else {
            obj.attr("action", "bbs_preview.php?id=" + $("input[name='id']", obj).val())
        }
    } else {
        obj.attr("action", "view_preview.php")
    }
    var a = check_submit(true);
    if (!a) {
        return false
    }
    obj.attr("target", "_blank");
    obj.submit();
    obj.attr("action", "");
    obj.attr("target", "_self");
    $("input[name='check']", $("form[name='check_attack']")).val(0)
}

function check_use_html(a) {
    if (!a.checked) {
        if (confirm("HTML�ъ슜�� 泥댄겕�댁젣 �섏떆寃좎뒿�덇퉴?\n\n�쎌엯�� �대�吏�媛� �뺤긽�곸쑝濡� �몄텧�섍린 �꾪빐�쒕뒗 HTML�ъ슜�� 泥댄겕�댁빞�⑸땲��.")) {
            a.value = 1
        }
    } else {
        c_n = confirm("�먮룞 以꾨컮轅덉쓣 �섏떆寃좎뒿�덇퉴?\n\n�먮룞 以꾨컮轅덉� 寃뚯떆臾� �댁슜以� 以꾨컮�� 怨녹쓣<br>�쒓렇濡� 蹂��섑븯�� 湲곕뒫�낅땲��.");
        if (c_n) {
            a.value = 1
        } else {
            a.value = 2
        }
    }
}

$(document).ready(function () {
    dobj = $("#bbs_upload dd");
    if (dobj.data("code") && dobj.data("tracknum") && dobj.data("url")) {
        ver = "";
        if ($("#bbs_upload dd").attr("upload-ver")) {
            ver = $("#bbs_upload dd").attr("upload-ver")
        }
        $.post(dobj.data("url"), {
            code: dobj.data("code"),
            tracknum: dobj.data("tracknum"),
            imgpath: dobj.data("ipath"),
            ver: ver
        }, function (a) {
            dobj.html(a)
        })
    }
    $("input[type=image]", $("div.btn2")).on("click", check_submit)
});

function category_change(c) {
    var b = $("form[name='search']");
    try {
        location.href = "/bbs/zboard.php?id=" + bbst + "&category=" + $(c).val() + "&setsearch=category"
    } catch (a) {}
    return true
}(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        a(window.jQuery)
    }
}(function (b) {
    var a = 0;
    b.ajaxTransport("iframe", function (c) {
        if (c.async && (c.type === "POST" || c.type === "GET")) {
            var e, d;
            return {
                send: function (f, g) {
                    e = b('<form style="display:none;"></form>');
                    e.attr("accept-charset", c.formAcceptCharset);
                    d = b('<iframe src="javascript:false;" name="iframe-transport-' + (a += 1) + '"></iframe>').bind("load", function () {
                        var h, j = b.isArray(c.paramName) ? c.paramName : [c.paramName];
                        d.unbind("load").bind("load", function () {
                            var k;
                            try {
                                k = d.contents();
                                if (!k.length || !k[0].firstChild) {
                                    throw new Error()
                                }
                            } catch (l) {
                                k = undefined
                            }
                            g(200, "success", {
                                iframe: k
                            });
                            b('<iframe src="javascript:false;"></iframe>').appendTo(e);
                            e.remove()
                        });
                        e.prop("target", d.prop("name")).prop("action", c.url).prop("method", c.type);
                        if (c.formData) {
                            b.each(c.formData, function (k, l) {
                                b('<input type="hidden"/>').prop("name", l.name).val(l.value).appendTo(e)
                            })
                        }
                        if (c.fileInput && c.fileInput.length && c.type === "POST") {
                            h = c.fileInput.clone();
                            c.fileInput.after(function (k) {
                                return h[k]
                            });
                            if (c.paramName) {
                                c.fileInput.each(function (k) {
                                    b(this).prop("name", j[k] || c.paramName)
                                })
                            }
                            e.append(c.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data")
                        }
                        e.submit();
                        if (h && h.length) {
                            c.fileInput.each(function (l, k) {
                                var m = b(h[l]);
                                b(k).prop("name", m.prop("name"));
                                m.replaceWith(k)
                            })
                        }
                    });
                    e.append(d).appendTo(document.body)
                },
                abort: function () {
                    if (d) {
                        d.unbind("load").prop("src", "javascript".concat(":false;"))
                    }
                    if (e) {
                        e.remove()
                    }
                }
            }
        }
    });
    b.ajaxSetup({
        converters: {
            "iframe text": function (c) {
                return b(c[0].body).text()
            },
            "iframe json": function (c) {
                return b.parseJSON(b(c[0].body).text())
            },
            "iframe html": function (c) {
                return b(c[0].body).html()
            },
            "iframe script": function (c) {
                return b.globalEval(b(c[0].body).text())
            }
        }
    })
}));
(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "jquery.ui.widget"], a)
    } else {
        if (typeof exports === "object") {
            a(require("jquery"), require("./vendor/jquery.ui.widget"))
        } else {
            a(window.jQuery)
        }
    }
}(function (b) {
    b.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || b('<input type="file">').prop("disabled"));
    b.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    b.support.xhrFormDataFileUpload = !!window.FormData;
    b.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    function a(c) {
        var d = c === "dragover";
        return function (g) {
            g.dataTransfer = g.originalEvent && g.originalEvent.dataTransfer;
            var f = g.dataTransfer;
            if (f && b.inArray("Files", f.types) !== -1 && this._trigger(c, b.Event(c, {
                    delegatedEvent: g
                })) !== false) {
                g.preventDefault();
                if (d) {
                    f.dropEffect = "copy"
                }
            }
        }
    }
    b.widget("blueimp.fileupload", {
        options: {
            dropZone: b(document),
            pasteZone: b(document),
            fileInput: undefined,
            replaceFileInput: true,
            paramName: undefined,
            singleFileUploads: true,
            limitMultiFileUploads: undefined,
            limitMultiFileUploadSize: undefined,
            limitMultiFileUploadSizeOverhead: 512,
            sequentialUploads: true,
            limitConcurrentUploads: undefined,
            forceIframeTransport: false,
            redirect: undefined,
            redirectParamName: undefined,
            postMessage: undefined,
            multipart: true,
            maxChunkSize: undefined,
            uploadedBytes: undefined,
            recalculateProgress: true,
            progressInterval: 100,
            bitrateInterval: 500,
            autoUpload: true,
            messages: {
                uploadedBytes: "�덉슜 媛��� �⑸웾�� 珥덇낵�섏��듬땲��"
            },
            i18n: function (d, c) {
                d = this.messages[d] || d.toString();
                if (c) {
                    b.each(c, function (e, f) {
                        d = d.replace("{" + e + "}", f)
                    })
                }
                return d
            },
            formData: function (c) {
                return c.serializeArray()
            },
            add: function (d, c) {
                if (d.isDefaultPrevented()) {
                    return false
                }
                if (c.autoUpload || (c.autoUpload !== false && b(this).fileupload("option", "autoUpload"))) {
                    c.process().done(function () {
                        c.submit()
                    })
                }
            },
            processData: false,
            contentType: false,
            cache: false,
            timeout: 0
        },
        _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
        _blobSlice: b.support.blobSlice && function () {
            var c = this.slice || this.webkitSlice || this.mozSlice;
            return c.apply(this, arguments)
        },
        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (e, d, c) {
                var f = e - this.timestamp;
                if (!this.bitrate || !c || f > c) {
                    this.bitrate = (d - this.loaded) * (1000 / f) * 8;
                    this.loaded = d;
                    this.timestamp = e
                }
                return this.bitrate
            }
        },
        _isXHRUpload: function (c) {
            return !c.forceIframeTransport && ((!c.multipart && b.support.xhrFileUpload) || b.support.xhrFormDataFileUpload)
        },
        _getFormData: function (c) {
            var d;
            if (b.type(c.formData) === "function") {
                return c.formData(c.form)
            }
            if (b.isArray(c.formData)) {
                return c.formData
            }
            if (b.type(c.formData) === "object") {
                d = [];
                b.each(c.formData, function (e, f) {
                    d.push({
                        name: e,
                        value: f
                    })
                });
                return d
            }
            return []
        },
        _getTotal: function (d) {
            var c = 0;
            b.each(d, function (e, f) {
                c += f.size || 1
            });
            return c
        },
        _initProgressObject: function (d) {
            var c = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (d._progress) {
                b.extend(d._progress, c)
            } else {
                d._progress = c
            }
        },
        _initResponseObject: function (c) {
            var d;
            if (c._response) {
                for (d in c._response) {
                    if (c._response.hasOwnProperty(d)) {
                        delete c._response[d]
                    }
                }
            } else {
                c._response = {}
            }
        },
        _onProgress: function (g, f) {
            if (g.lengthComputable) {
                var d = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    c;
                if (f._time && f.progressInterval && (d - f._time < f.progressInterval) && g.loaded !== g.total) {
                    return
                }
                f._time = d;
                c = Math.floor(g.loaded / g.total * (f.chunkSize || f._progress.total)) + (f.uploadedBytes || 0);
                this._progress.loaded += (c - f._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(d, this._progress.loaded, f.bitrateInterval);
                f._progress.loaded = f.loaded = c;
                f._progress.bitrate = f.bitrate = f._bitrateTimer.getBitrate(d, c, f.bitrateInterval);
                this._trigger("progress", b.Event("progress", {
                    delegatedEvent: g
                }), f);
                this._trigger("progressall", b.Event("progressall", {
                    delegatedEvent: g
                }), this._progress)
            }
        },
        _initProgressListener: function (c) {
            var d = this,
                e = c.xhr ? c.xhr() : b.ajaxSettings.xhr();
            if (e.upload) {
                b(e.upload).bind("progress", function (f) {
                    var g = f.originalEvent;
                    f.lengthComputable = g.lengthComputable;
                    f.loaded = g.loaded;
                    f.total = g.total;
                    d._onProgress(f, c)
                });
                c.xhr = function () {
                    return e
                }
            }
        },
        _isInstanceOf: function (c, d) {
            return Object.prototype.toString.call(d) === "[object " + c + "]"
        },
        _initXHRData: function (d) {
            var f = this,
                h, e = d.files[0],
                c = d.multipart || !b.support.xhrFileUpload,
                g = b.type(d.paramName) === "array" ? d.paramName[0] : d.paramName;
            d.headers = b.extend({}, d.headers);
            if (d.contentRange) {
                d.headers["Content-Range"] = d.contentRange
            }
            if (!c || d.blob || !this._isInstanceOf("File", e)) {
                d.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(e.name) + '"'
            }
            if (!c) {
                d.contentType = e.type || "application/octet-stream";
                d.data = d.blob || e
            } else {
                if (b.support.xhrFormDataFileUpload) {
                    if (d.postMessage) {
                        h = this._getFormData(d);
                        if (d.blob) {
                            h.push({
                                name: g,
                                value: d.blob
                            })
                        } else {
                            b.each(d.files, function (j, k) {
                                h.push({
                                    name: (b.type(d.paramName) === "array" && d.paramName[j]) || g,
                                    value: k
                                })
                            })
                        }
                    } else {
                        if (f._isInstanceOf("FormData", d.formData)) {
                            h = d.formData
                        } else {
                            h = new FormData();
                            b.each(this._getFormData(d), function (j, k) {
                                h.append(k.name, k.value)
                            })
                        }
                        if (d.blob) {
                            h.append(g, d.blob, e.name)
                        } else {
                            b.each(d.files, function (j, k) {
                                if (f._isInstanceOf("File", k) || f._isInstanceOf("Blob", k)) {
                                    h.append((b.type(d.paramName) === "array" && d.paramName[j]) || g, k, k.uploadName || k.name)
                                }
                            })
                        }
                    }
                    d.data = h
                }
            }
            d.blob = null
        },
        _initIframeSettings: function (c) {
            var d = b("<a></a>").prop("href", c.url).prop("host");
            c.dataType = "iframe " + (c.dataType || "");
            c.formData = this._getFormData(c);
            if (c.redirect && d && d !== location.host) {
                c.formData.push({
                    name: c.redirectParamName || "redirect",
                    value: c.redirect
                })
            }
        },
        _initDataSettings: function (c) {
            if (this._isXHRUpload(c)) {
                if (!this._chunkedUpload(c, true)) {
                    if (!c.data) {
                        this._initXHRData(c)
                    }
                    this._initProgressListener(c)
                }
                if (c.postMessage) {
                    c.dataType = "postmessage " + (c.dataType || "")
                }
            } else {
                this._initIframeSettings(c)
            }
        },
        _getParamName: function (c) {
            var d = b(c.fileInput),
                e = c.paramName;
            if (!e) {
                e = [];
                d.each(function () {
                    var f = b(this),
                        g = f.prop("name") || "files[]",
                        h = (f.prop("files") || [1]).length;
                    while (h) {
                        e.push(g);
                        h -= 1
                    }
                });
                if (!e.length) {
                    e = [d.prop("name") || "files[]"]
                }
            } else {
                if (!b.isArray(e)) {
                    e = [e]
                }
            }
            return e
        },
        _initFormSettings: function (c) {
            if (!c.form || !c.form.length) {
                c.form = b(c.fileInput.prop("form"));
                if (!c.form.length) {
                    c.form = b(this.options.fileInput.prop("form"))
                }
            }
            c.paramName = this._getParamName(c);
            if (!c.url) {
                c.url = c.form.prop("action") || location.href
            }
            c.type = (c.type || (b.type(c.form.prop("method")) === "string" && c.form.prop("method")) || "").toUpperCase();
            if (c.type !== "POST" && c.type !== "PUT" && c.type !== "PATCH") {
                c.type = "POST"
            }
            if (!c.formAcceptCharset) {
                c.formAcceptCharset = c.form.attr("accept-charset")
            }
        },
        _getAJAXSettings: function (d) {
            var c = b.extend({}, this.options, d);
            this._initFormSettings(c);
            this._initDataSettings(c);
            return c
        },
        _getDeferredState: function (c) {
            if (c.state) {
                return c.state()
            }
            if (c.isResolved()) {
                return "resolved"
            }
            if (c.isRejected()) {
                return "rejected"
            }
            return "pending"
        },
        _enhancePromise: function (c) {
            c.success = c.done;
            c.error = c.fail;
            c.complete = c.always;
            return c
        },
        _getXHRPromise: function (f, e, d) {
            var c = b.Deferred(),
                g = c.promise();
            e = e || this.options.context || g;
            if (f === true) {
                c.resolveWith(e, d)
            } else {
                if (f === false) {
                    c.rejectWith(e, d)
                }
            }
            g.abort = c.promise;
            return this._enhancePromise(g)
        },
        _addConvenienceMethods: function (g, f) {
            var d = this,
                c = function (e) {
                    return b.Deferred().resolveWith(d, e).promise()
                };
            f.process = function (h, e) {
                if (h || e) {
                    f._processQueue = this._processQueue = (this._processQueue || c([this])).pipe(function () {
                        if (f.errorThrown) {
                            return b.Deferred().rejectWith(d, [f]).promise()
                        }
                        return c(arguments)
                    }).pipe(h, e)
                }
                return this._processQueue || c([this])
            };
            f.submit = function () {
                if (this.state() !== "pending") {
                    f.jqXHR = this.jqXHR = (d._trigger("submit", b.Event("submit", {
                        delegatedEvent: g
                    }), this) !== false) && d._onSend(g, this)
                }
                return this.jqXHR || d._getXHRPromise()
            };
            f.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort()
                }
                this.errorThrown = "abort";
                d._trigger("fail", null, this);
                return d._getXHRPromise(false)
            };
            f.state = function () {
                if (this.jqXHR) {
                    return d._getDeferredState(this.jqXHR)
                }
                if (this._processQueue) {
                    return d._getDeferredState(this._processQueue)
                }
            };
            f.processing = function () {
                return !this.jqXHR && this._processQueue && d._getDeferredState(this._processQueue) === "pending"
            };
            f.progress = function () {
                return this._progress
            };
            f.response = function () {
                return this._response
            }
        },
        _getUploadedBytes: function (e) {
            var c = e.getResponseHeader("Range"),
                f = c && c.split("-"),
                d = f && f.length > 1 && parseInt(f[1], 10);
            return d && d + 1
        },
        _chunkedUpload: function (o, h) {
            o.uploadedBytes = o.uploadedBytes || 0;
            var g = this,
                e = o.files[0],
                f = e.size,
                c = o.uploadedBytes,
                d = o.maxChunkSize || f,
                k = this._blobSlice,
                l = b.Deferred(),
                n = l.promise(),
                j, m;
            if (!(this._isXHRUpload(o) && k && (c || d < f)) || o.data) {
                return false
            }
            if (h) {
                return true
            }
            if (c >= f) {
                e.error = o.i18n("uploadedBytes");
                return this._getXHRPromise(false, o.context, [null, "error", e.error])
            }
            m = function () {
                var q = b.extend({}, o),
                    p = q._progress.loaded;
                q.blob = k.call(e, c, c + d, e.type);
                q.chunkSize = q.blob.size;
                q.contentRange = "bytes " + c + "-" + (c + q.chunkSize - 1) + "/" + f;
                g._initXHRData(q);
                g._initProgressListener(q);
                j = ((g._trigger("chunksend", null, q) !== false && b.ajax(q)) || g._getXHRPromise(false, q.context)).done(function (r, t, s) {
                    c = g._getUploadedBytes(s) || (c + q.chunkSize);
                    if (p + q.chunkSize - q._progress.loaded) {
                        g._onProgress(b.Event("progress", {
                            lengthComputable: true,
                            loaded: c - q.uploadedBytes,
                            total: c - q.uploadedBytes
                        }), q)
                    }
                    o.uploadedBytes = q.uploadedBytes = c;
                    q.result = r;
                    q.textStatus = t;
                    q.jqXHR = s;
                    g._trigger("chunkdone", null, q);
                    g._trigger("chunkalways", null, q);
                    if (c < f) {
                        m()
                    } else {
                        l.resolveWith(q.context, [r, t, s])
                    }
                }).fail(function (r, t, s) {
                    q.jqXHR = r;
                    q.textStatus = t;
                    q.errorThrown = s;
                    g._trigger("chunkfail", null, q);
                    g._trigger("chunkalways", null, q);
                    l.rejectWith(q.context, [r, t, s])
                })
            };
            this._enhancePromise(n);
            n.abort = function () {
                return j.abort()
            };
            m();
            return n
        },
        _beforeSend: function (d, c) {
            if (this._active === 0) {
                this._trigger("start");
                this._bitrateTimer = new this._BitrateTimer();
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0
            }
            this._initResponseObject(c);
            this._initProgressObject(c);
            c._progress.loaded = c.loaded = c.uploadedBytes || 0;
            c._progress.total = c.total = this._getTotal(c.files) || 1;
            c._progress.bitrate = c.bitrate = 0;
            this._active += 1;
            this._progress.loaded += c.loaded;
            this._progress.total += c.total
        },
        _onDone: function (c, h, g, e) {
            var f = e._progress.total,
                d = e._response;
            if (e._progress.loaded < f) {
                this._onProgress(b.Event("progress", {
                    lengthComputable: true,
                    loaded: f,
                    total: f
                }), e)
            }
            d.result = e.result = c;
            d.textStatus = e.textStatus = h;
            d.jqXHR = e.jqXHR = g;
            this._trigger("done", null, e)
        },
        _onFail: function (e, g, f, d) {
            var c = d._response;
            if (d.recalculateProgress) {
                this._progress.loaded -= d._progress.loaded;
                this._progress.total -= d._progress.total
            }
            c.jqXHR = d.jqXHR = e;
            c.textStatus = d.textStatus = g;
            c.errorThrown = d.errorThrown = f;
            this._trigger("fail", null, d)
        },
        _onAlways: function (e, f, d, c) {
            this._trigger("always", null, c)
        },
        _onSend: function (j, g) {
            if (!g.submit) {
                this._addConvenienceMethods(j, g)
            }
            var h = this,
                l, c, k, d, m = h._getAJAXSettings(g),
                f = function () {
                    h._sending += 1;
                    m._bitrateTimer = new h._BitrateTimer();
                    l = l || (((c || h._trigger("send", b.Event("send", {
                        delegatedEvent: j
                    }), m) === false) && h._getXHRPromise(false, m.context, c)) || h._chunkedUpload(m) || b.ajax(m)).done(function (e, o, n) {
                        h._onDone(e, o, n, m)
                    }).fail(function (e, o, n) {
                        h._onFail(e, o, n, m)
                    }).always(function (o, p, n) {
                        h._onAlways(o, p, n, m);
                        h._sending -= 1;
                        h._active -= 1;
                        if (m.limitConcurrentUploads && m.limitConcurrentUploads > h._sending) {
                            var e = h._slots.shift();
                            while (e) {
                                if (h._getDeferredState(e) === "pending") {
                                    e.resolve();
                                    break
                                }
                                e = h._slots.shift()
                            }
                        }
                        if (h._active === 0) {
                            h._trigger("stop")
                        }
                    });
                    return l
                };
            this._beforeSend(j, m);
            if (this.options.sequentialUploads || (this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    k = b.Deferred();
                    this._slots.push(k);
                    d = k.pipe(f)
                } else {
                    this._sequence = this._sequence.pipe(f, f);
                    d = this._sequence
                }
                d.abort = function () {
                    c = [undefined, "abort", "abort"];
                    if (!l) {
                        if (k) {
                            k.rejectWith(m.context, c)
                        }
                        return f()
                    }
                    return l.abort()
                };
                return this._enhancePromise(d)
            }
            return f()
        },
        _onAdd: function (q, m) {
            var p = this,
                v = true,
                u = b.extend({}, this.options, m),
                f = m.files,
                s = f.length,
                g = u.limitMultiFileUploads,
                k = u.limitMultiFileUploadSize,
                t = u.limitMultiFileUploadSizeOverhead,
                o = 0,
                n = this._getParamName(u),
                d, c, r, l, h = 0;
            if (!s) {
                return false
            }
            if (k && f[0].size === undefined) {
                k = undefined
            }
            if (!(u.singleFileUploads || g || k) || !this._isXHRUpload(u)) {
                r = [f];
                d = [n]
            } else {
                if (!(u.singleFileUploads || k) && g) {
                    r = [];
                    d = [];
                    for (l = 0; l < s; l += g) {
                        r.push(f.slice(l, l + g));
                        c = n.slice(l, l + g);
                        if (!c.length) {
                            c = n
                        }
                        d.push(c)
                    }
                } else {
                    if (!u.singleFileUploads && k) {
                        r = [];
                        d = [];
                        for (l = 0; l < s; l = l + 1) {
                            o += f[l].size + t;
                            if (l + 1 === s || ((o + f[l + 1].size + t) > k) || (g && l + 1 - h >= g)) {
                                r.push(f.slice(h, l + 1));
                                c = n.slice(h, l + 1);
                                if (!c.length) {
                                    c = n
                                }
                                d.push(c);
                                h = l + 1;
                                o = 0
                            }
                        }
                    } else {
                        d = n
                    }
                }
            }
            m.originalFiles = f;
            b.each(r || f, function (e, j) {
                var w = b.extend({}, m);
                w.files = r ? j : [j];
                w.paramName = d[e];
                p._initResponseObject(w);
                p._initProgressObject(w);
                p._addConvenienceMethods(q, w);
                v = p._trigger("add", b.Event("add", {
                    delegatedEvent: q
                }), w);
                return v
            });
            return v
        },
        _replaceFileInput: function (f) {
            var c = f.fileInput,
                d = c.clone(true),
                e = c.is(document.activeElement);
            f.fileInputClone = d;
            b("<form></form>").append(d)[0].reset();
            c.after(d).detach();
            if (e) {
                d.focus()
            }
            b.cleanData(c.unbind("remove"));
            this.options.fileInput = this.options.fileInput.map(function (g, h) {
                if (h === c[0]) {
                    return d[0]
                }
                return h
            });
            if (c[0] === this.element[0]) {
                this.element = d
            }
        },
        _handleFileTreeEntry: function (h, k) {
            var e = this,
                j = b.Deferred(),
                d = function (m) {
                    if (m && !m.entry) {
                        m.entry = h
                    }
                    j.resolve([m])
                },
                f = function (m) {
                    e._handleFileTreeEntries(m, k + h.name + "/").done(function (n) {
                        j.resolve(n)
                    }).fail(d)
                },
                g = function () {
                    l.readEntries(function (m) {
                        if (!m.length) {
                            f(c)
                        } else {
                            c = c.concat(m);
                            g()
                        }
                    }, d)
                },
                l, c = [];
            k = k || "";
            if (h.isFile) {
                if (h._file) {
                    h._file.relativePath = k;
                    j.resolve(h._file)
                } else {
                    h.file(function (m) {
                        m.relativePath = k;
                        j.resolve(m)
                    }, d)
                }
            } else {
                if (h.isDirectory) {
                    l = h.createReader();
                    g()
                } else {
                    j.resolve([])
                }
            }
            return j.promise()
        },
        _handleFileTreeEntries: function (c, e) {
            var d = this;
            return b.when.apply(b, b.map(c, function (f) {
                return d._handleFileTreeEntry(f, e)
            })).pipe(function () {
                return Array.prototype.concat.apply([], arguments)
            })
        },
        _getDroppedFiles: function (d) {
            d = d || {};
            var c = d.items;
            if (c && c.length && (c[0].webkitGetAsEntry || c[0].getAsEntry)) {
                return this._handleFileTreeEntries(b.map(c, function (f) {
                    var e;
                    if (f.webkitGetAsEntry) {
                        e = f.webkitGetAsEntry();
                        if (e) {
                            e._file = f.getAsFile()
                        }
                        return e
                    }
                    return f.getAsEntry()
                }))
            }
            return b.Deferred().resolve(b.makeArray(d.files)).promise()
        },
        _getSingleFileInputFiles: function (e) {
            e = b(e);
            var c = e.prop("webkitEntries") || e.prop("entries"),
                d, f;
            if (c && c.length) {
                return this._handleFileTreeEntries(c)
            }
            d = b.makeArray(e.prop("files"));
            if (!d.length) {
                f = e.prop("value");
                if (!f) {
                    return b.Deferred().resolve([]).promise()
                }
                d = [{
                    name: f.replace(/^.*\\/, "")
                }]
            } else {
                if (d[0].name === undefined && d[0].fileName) {
                    b.each(d, function (g, h) {
                        h.name = h.fileName;
                        h.size = h.fileSize
                    })
                }
            }
            return b.Deferred().resolve(d).promise()
        },
        _getFileInputFiles: function (c) {
            if (!(c instanceof b) || c.length === 1) {
                return this._getSingleFileInputFiles(c)
            }
            return b.when.apply(b, b.map(c, this._getSingleFileInputFiles)).pipe(function () {
                return Array.prototype.concat.apply([], arguments)
            })
        },
        _onChange: function (f) {
            var c = this,
                d = {
                    fileInput: b(f.target),
                    form: b(f.target.form)
                };
            this._getFileInputFiles(d.fileInput).always(function (e) {
                d.files = e;
                if (c.options.replaceFileInput) {
                    c._replaceFileInput(d)
                }
                if (c._trigger("change", b.Event("change", {
                        delegatedEvent: f
                    }), d) !== false) {
                    c._onAdd(f, d)
                }
            })
        },
        _onPaste: function (f) {
            var c = f.originalEvent && f.originalEvent.clipboardData && f.originalEvent.clipboardData.items,
                d = {
                    files: []
                };
            if (c && c.length) {
                b.each(c, function (e, h) {
                    var g = h.getAsFile && h.getAsFile();
                    if (g) {
                        d.files.push(g)
                    }
                });
                if (this._trigger("paste", b.Event("paste", {
                        delegatedEvent: f
                    }), d) !== false) {
                    this._onAdd(f, d)
                }
            }
        },
        _onDrop: function (g) {
            g.dataTransfer = g.originalEvent && g.originalEvent.dataTransfer;
            var c = this,
                f = g.dataTransfer,
                d = {};
            if (f && f.files && f.files.length) {
                g.preventDefault();
                this._getDroppedFiles(f).always(function (e) {
                    d.files = e;
                    if (c._trigger("drop", b.Event("drop", {
                            delegatedEvent: g
                        }), d) !== false) {
                        c._onAdd(g, d)
                    }
                })
            }
        },
        _onDragOver: a("dragover"),
        _onDragEnter: a("dragenter"),
        _onDragLeave: a("dragleave"),
        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    dragenter: this._onDragEnter,
                    dragleave: this._onDragLeave
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                })
            }
            if (b.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                })
            }
        },
        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, "dragenter dragleave dragover drop");
            this._off(this.options.pasteZone, "paste");
            this._off(this.options.fileInput, "change")
        },
        _setOption: function (c, d) {
            var e = b.inArray(c, this._specialOptions) !== -1;
            if (e) {
                this._destroyEventHandlers()
            }
            this._super(c, d);
            if (e) {
                this._initSpecialOptions();
                this._initEventHandlers()
            }
        },
        _initSpecialOptions: function () {
            var c = this.options;
            if (c.fileInput === undefined) {
                c.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]')
            } else {
                if (!(c.fileInput instanceof b)) {
                    c.fileInput = b(c.fileInput)
                }
            }
            if (!(c.dropZone instanceof b)) {
                c.dropZone = b(c.dropZone)
            }
            if (!(c.pasteZone instanceof b)) {
                c.pasteZone = b(c.pasteZone)
            }
        },
        _getRegExp: function (e) {
            var d = e.split("/"),
                c = d.pop();
            d.shift();
            return new RegExp(d.join("/"), c)
        },
        _isRegExpOption: function (c, d) {
            return c !== "url" && b.type(d) === "string" && /^\/.*\/[igm]{0,3}$/.test(d)
        },
        _initDataAttributes: function () {
            var d = this,
                c = this.options,
                e = this.element.data();
            b.each(this.element[0].attributes, function (g, f) {
                var h = f.name.toLowerCase(),
                    j;
                if (/^data-/.test(h)) {
                    h = h.slice(5).replace(/-[a-z]/g, function (k) {
                        return k.charAt(1).toUpperCase()
                    });
                    j = e[h];
                    if (d._isRegExpOption(h, j)) {
                        j = d._getRegExp(j)
                    }
                    c[h] = j
                }
            })
        },
        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers()
        },
        active: function () {
            return this._active
        },
        progress: function () {
            return this._progress
        },
        add: function (d) {
            var c = this;
            if (!d || this.options.disabled) {
                return
            }
            if (d.fileInput && !d.files) {
                this._getFileInputFiles(d.fileInput).always(function (e) {
                    d.files = e;
                    c._onAdd(null, d)
                })
            } else {
                d.files = b.makeArray(d.files);
                this._onAdd(null, d)
            }
        },
        send: function (g) {
            if (g && !this.options.disabled) {
                if (g.fileInput && !g.files) {
                    var e = this,
                        c = b.Deferred(),
                        h = c.promise(),
                        d, f;
                    h.abort = function () {
                        f = true;
                        if (d) {
                            return d.abort()
                        }
                        c.reject(null, "abort", "abort");
                        return h
                    };
                    this._getFileInputFiles(g.fileInput).always(function (j) {
                        if (f) {
                            return
                        }
                        if (!j.length) {
                            c.reject();
                            return
                        }
                        g.files = j;
                        d = e._onSend(null, g);
                        d.then(function (k, m, l) {
                            c.resolve(k, m, l)
                        }, function (k, m, l) {
                            c.reject(k, m, l)
                        })
                    });
                    return this._enhancePromise(h)
                }
                g.files = b.makeArray(g.files);
                if (g.files.length) {
                    return this._onSend(null, g)
                }
            }
            return this._getXHRPromise(false, g && g.context)
        }
    })
}));
jQuery.createXMLDocument = function (a) {
    browserName = navigator.appName;
    if (browserName == "Microsoft Internet Explorer") {
        doc = new ActiveXObject("Microsoft.XMLDOM");
        doc.async = "false";
        doc.loadXML(a)
    } else {
        doc = (new DOMParser()).parseFromString(a, "text/xml")
    }
    return doc
};
var slrUpload = {
    imgpath: "http://media.slrclub.com/main/2012/upload",
    bbs: "",
    pcode: "",
    view_type: "thumb",
    linkUse: false,
    thumbUse: false,
    auto: false,
    init: function (a) {
        if (typeof (a) != "undefined") {
            slrUpload.auto = a
        }
        $("#fileupload").fileupload({
            url: "/file/art"
        });
        $("#fileupload").fileupload({
            add: function (c, b) {
                rep = $("#fileupload").fileupload("option", "acceptFileTypes");
                if (b.files.length > 0 && b.files[0] != undefined) {
                    $(b.files).each(function (d, e) {
                        if (!rep.test(e.name)) {
                            slrerror(e.name + " �� �낅줈�� 媛��ν븳 �뺤떇�� �뚯씪�� �꾨떃�덈떎");
                            delete b.files[d];
                            delete b.originalFiles[d];
                            b.files.length--;
                            b.originalFiles.length--
                        } else {
                            if (e.size > $("#fileupload").fileupload("option", "maxFileSize")) {
                                slrerror(e.name + " �뚯씪�� �⑸웾�� 珥덇낵�섏뿬 �낅줈�� �섏� �딆븯�듬땲��");
                                delete b.files[d];
                                delete b.originalFiles[d];
                                b.files.length--;
                                b.originalFiles.length--
                            }
                        }
                    })
                }
                if (b.files.length > 0 && b.files[0] != undefined) {
                    b.submit()
                }
            },
            progress: function (c, b) {
                pg = parseInt(b.loaded / b.total * 100, 10);
                $("#progress .bar").css("width", pg + "%")
            },
            progressall: function (c, b) {
                if ($("#file_upload .cm_layer")) {
                    $("#file_upload .cm_layer").remove()
                }
                pg = parseInt(b.loaded / b.total * 100, 10);
                obj = $(document.createElement("div")).addClass("cm_layer");
                obj.append($(document.createElement("h3")).addClass("top").text("�뚯씪�꾩넚以�"));
                obj2 = $(document.createElement("div")).addClass("fileupload-progress ");
                obj3 = $(document.createElement("div")).attr({
                    id: "progress",
                    "class": "prg_cl progress-success progress-striped active",
                    role: "progressbar",
                    "aria-valuemin": 0,
                    "aria-valuemax": 100
                });
                obj3.append($(document.createElement("div")).attr({
                    "class": "bar"
                }).css("width", "0%"));
                obj2.append(obj3);
                obj.append(obj2);
                $("#file_upload .upload_list").append(obj);
                $("#progress .bar").css("width", pg + "%")
            },
            done: function (d, c) {
                if ($("#file_upload .cm_layer").length > 0) {
                    $("#file_upload .cm_layer").remove()
                }
                if ($(c.result).find("MSG").length > 0) {
                    if ($.browser.msie) {
                        try {
                            c.abort()
                        } catch (d) {}
                        slrerror($(c.result).last().text(), d)
                    } else {
                        try {
                            c.abort()
                        } catch (d) {}
                        slrerror($(c.result).find("MSG").text(), d)
                    }
                } else {
                    if (slrUpload.linkUse == "true") {
                        if (typeof ($("upcontrol", c.result)[0]) != "undefined" && typeof ($("upcontrol", c.result)) != "undefined") {
                            fn = $("upcontrol", c.result).text();
                            if (!fn) {
                                fn = $("upcontrol", c.result).attr("fn")
                            }
                            filepath = "http://media.slrclub.com/" + $("upcontrol", c.result).attr("dir") + "/" + fn;
                            if ($("upcontrol", c.result).attr("img") == true) {
                                var b = $("upcontrol", c.result).attr("org_fn");
                                slrUpload.addImgLink(this, filepath, b)
                            }
                        }
                    }
                }
                slrUpload.getCheck();
                slrUpload.getState(true)
            }
        });
        slrUpload.getCheck();
        slrUpload.getState(true);
        $("#fileupload input[type=file]").on("click", function (b) {
            slrUpload.printGuide()
        });
        $(".delete_a", "#fileupload").on("click", this.multipleDeleteFile);
        $(".refresh_a", "#fileupload").on("click", function (b) {
            slrUpload.getCheck();
            slrUpload.getState(true)
        });
        $(".view_type", "#fileupload").on("click", this.viewChange)
    },
    printGuide: function () {
        if ($("#file_upload .cm_layer")) {
            $("#file_upload .cm_layer").remove()
        }
        obj = $(document.createElement("div")).addClass("cm_layer");
        obj.append($(document.createElement("h3")).addClass("top").text("�뚮┝"));
        obj.append($(document.createElement("p")).html("�낅줈�� �섏떎 �뚯씪�� �좏깮�섏뿬 二쇱꽭��.<br/>�쒕옒洹� �낅줈�쒕룄 媛��ν빀�덈떎.<br />�뚯씪�� �ы봽�몃굹 而⑦듃濡� �ㅻ� �꾨Ⅸ梨� �щ윭�μ쓣 �좏깮�� �� �덉뒿�덈떎."));
        $("#file_upload .upload_list").append(obj);
        setTimeout("jQuery('#file_upload .cm_layer').remove();", 5000)
    },
    addImgLink: function (b, c, a) {
        file = c ? c : "";
        if (!file) {
            if (typeof ($(b.target).parents("li")) != "undefined") {
                file = $(b.target).parents("li").attr("filepath")
            } else {
                return
            }
        }
        if ($("#memo").attr("readonly") == "readonly") {
            txtarea = $("#addmemo")[0]
        } else {
            txtarea = $("#memo")[0]
        }
        strPos = 0;
        scrollPos = $(txtarea).scrollTop();
        text = '<img src="' + file + '" alt="' + a + '" />\n';
        $("#fileupload").trigger("addImgLink", {
            data: text
        });
        if ($.browser.msie) {
            slrUpload.insertAtCaret(txtarea, text)
        } else {
            if ($(txtarea).val().length - 1 != parseInt($(txtarea).val().lastIndexOf("\n"))) {
                $(txtarea).val($(txtarea).val() + "\n")
            }
            strPos = txtarea.selectionStart;
            front = $(txtarea).val().substring(0, strPos);
            back = $(txtarea).val().substring(strPos, $(txtarea).val().length);
            $(txtarea).val(front + text + back);
            strPos = strPos + text.length;
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
            $(txtarea).scrollTop(scrollPos)
        }
    },
    insertAtCaret: function (b, a) {
        b.focus();
        if (typeof (document.selection) != "undefined") {
            range = document.selection.createRange();
            if (range.parentElement() != b) {
                return
            }
            range.text = a;
            range.select()
        } else {
            if (typeof (b.selectionStart) != "undefined") {
                start = b.selectionStart;
                b.value = b.value.substr(0, start) + a + b.value.substr(b.selectionEnd, b.value.length);
                start += a.length;
                b.setSelectionRange(start, start)
            } else {
                b.value += a
            }
        }
        b.focus()
    },
    mainImgSet: function (a) {
        prt = $(a.target).parents("li");
        tmpobj = prt.attr("id").split("_");
        seq = tmpobj[1];
        $.ajax({
            url: "/file/art",
            data: "upmode=mkthumb&code=" + slrUpload.pcode + "&seq=" + seq,
            type: "POST",
            dataType: "xml",
            success: function (b) {
                if ($(b).find("ERROR MSG").text().length > 0) {
                    slrerror($(b).find("ERROR MSG").text(), event);
                    return
                }
                $("li .thumb_command4", $(".upload_list")).removeClass("show");
                if (view_type == "list") {
                    prt2 = $(a.target).parents(".general_list");
                    $(".thumb_command3", prt2).addClass("show");
                    $(a.target).parents(".thumb_command3").removeClass("show");
                    $(".thumb_command4", prt).addClass("show")
                } else {
                    $(".thumb_command4", prt).addClass("show")
                }
            }
        })
    },
    deleteUploadFile: function (a) {
        prt = $(a.target).parents("li");
        tmpobj = prt.attr("id").split("_");
        seq = tmpobj[1];
        $.post("/file/art", {
            upmode: "remove",
            code: slrUpload.pcode,
            seq: seq
        }, function (b) {
            if ($(b).find("ERROR MSG").text().length > 0) {
                slrerror($(b).find("ERROR MSG").text(), event);
                return
            }
            slrUpload.getCheck();
            slrUpload.getState(true);
            $("#fileupload").trigger("DeleteUploadFile", {
                data: prt.attr("filepath")
            })
        })
    },
    selectDeleteFile: function (a) {
        prt = $(a.target).parent();
        if ($(prt)) {
            if ($(prt).attr("class").indexOf("del_ok") < 0) {
                $(prt).addClass("del_ok");
                $(".thumb_command1", $(prt)).addClass("show")
            } else {
                $(prt).removeClass("del_ok");
                $(".thumb_command1", $(prt)).removeClass("show")
            }
        }
    },
    multipleDeleteFile: function () {
        seq = "";
        $("ul li.del_ok", $(".upload_list")).each(function (a, b) {
            tmp = $(b).attr("id").split("_");
            if (tmp[1]) {
                seq += tmp[1] + ","
            }
        });
        seq = seq.replace(/,$/, "");
        if (!seq) {
            alert("��젣�� �대�吏�瑜� �좏깮�댁＜�몄슂.")
        }
        $.post("/file/art", {
            upmode: "xremove",
            code: slrUpload.pcode,
            seq: seq
        }, function (a) {
            slrUpload.getCheck();
            slrUpload.getState(true);
            $("#fileupload").trigger("multipleDeleteFile", {
                data: a
            })
        })
    },
    viewChange: function () {
        tgt = $(".command .view_type", $("#file_upload"));
        if ($("img", tgt)) {
            if ($("img", tgt).attr("src").indexOf("thumb") > -1) {
                $("img", tgt).attr("src", $("img", tgt).attr("src").replace("thumb", "list"));
                $("img", tgt).attr("alt", $("img", tgt).attr("alt").replace("�щ꽕��", "由ъ뒪��"));
                slrUpload.view_type = "thumb"
            } else {
                $("img", tgt).attr("src", $("img", tgt).attr("src").replace("list", "thumb"));
                $("img", tgt).attr("alt", $("img", tgt).attr("alt").replace("由ъ뒪��", "�щ꽕��"));
                slrUpload.view_type = "list"
            }
        }
        slrUpload.getState(true)
    },
    getCheck: function () {
        $.ajax({
            url: "/file/art",
            data: "upmode=check&code=" + slrUpload.pcode,
            type: "POST",
            dataType: "xml",
            success: function (b) {
                if ($(b).find("ERROR MSG").text().length > 0) {
                    slrerror($(b).find("ERROR MSG").text(), event);
                    return
                }
                cfg_x = $(b).find("CONFIG");
                cnt = cfg_x.attr("cnt");
                maxCnt = cfg_x.attr("maxcnt");
                maxSize_t = cfg_x.attr("maxstr");
                cmaxSize_t = cfg_x.attr("cmaxstr");
                maxSize = cfg_x.attr("max");
                slrUpload.linkUse = cfg_x.attr("link");
                slrUpload.thumbUse = cfg_x.attr("thumb");
                limitExt = "(\\.|\\/)(" + cfg_x.text() + ")$";
                ext = new RegExp(limitExt, "i");
                if (slrUpload.auto == true) {
                    $("#file_upload .file_info").text(cnt + "/" + maxCnt + "媛� �낅줈�� 媛���. 媛쒕떦 " + cmaxSize_t);
                    $("#file_upload .file_info").append($(document.createElement("img")).attr({
                        width: 27,
                        height: 9,
                        alt: "BETA",
                        src: "http://media.slrclub.com/main/2012/common/icon_beta.gif"
                    }))
                } else {
                    var a = "";
                    if (cmaxSize_t != maxSize_t) {
                        a = "(" + maxSize_t + ") "
                    }
                    $("#file_upload .file_info").text(cnt + "/" + maxCnt + "媛� �낅줈�� 媛���. 媛쒕떦 " + cmaxSize_t + a + "�쒗븳")
                }
                $("#fileupload").fileupload("option", {
                    url: "/file/art",
                    maxFileSize: maxSize,
                    acceptFileTypes: ext,
                    singleFileUploads: true,
                    sequentialUploads: 1
                })
            }
        })
    },
    chgGps: function (a) {
        tmp = a.split(".");
        switch (tmp[1].length) {
            case 0:
                tmp[1] = "000000";
                break;
            case 1:
                tmp[1] += "00000";
                break;
            case 2:
                tmp[1] += "0000";
                break;
            case 3:
                tmp[1] += "000";
                break
        }
        p1 = parseInt(tmp[1].substring(0, 2), 10);
        p2 = parseInt(tmp[1].substring(2, 4), 10);
        p3 = parseInt(tmp[1].substring(4), 10) || 0;
        return parseInt(tmp[0], 10) + p1 / 60 + (p2 + p3) / 3600
    },
    getState: function (a) {
        a = a ? a : false;
        view_type = slrUpload.view_type ? slrUpload.view_type : "thumb";
        $.ajax({
            url: "/file/art",
            type: "post",
            data: "upmode=state&code=" + slrUpload.pcode,
            dataType: "xml",
            success: function (b) {
                upfile = $("upfile", $(b));
                uploadFiles = [];
                text = "";
                text2 = "";
                $("#file_upload .upload_list").append(document.createElement("ul"));
                for (i = 0; i < upfile.length; i++) {
                    thumb = "http://media.slrclub.com/" + upfile[i].getAttribute("dir") + "/thumb/" + upfile[i].getAttribute("file");
                    file = "http://media.slrclub.com/" + upfile[i].getAttribute("dir") + "/" + upfile[i].getAttribute("file");
                    seq = upfile[i].getAttribute("seq");
                    width = parseInt(upfile[i].getAttribute("width"), 10);
                    height = parseInt(upfile[i].getAttribute("height"), 10);
                    lat = upfile[i].getAttribute("lat");
                    lng = upfile[i].getAttribute("lng");
                    mainImg_cl = "";
                    subImg_cl = "";
                    if (upfile[i].getAttribute("thumb") == "master") {
                        mainImg_cl = " show"
                    } else {
                        if (upfile[i].getAttribute("thumb") == "none" || upfile[i].getAttribute("type") == "file") {
                            thumb = "http://media.slrclub.com/main/2012/common/no_thumb.gif";
                            width = 127;
                            height = 127
                        } else {
                            subImg_cl = " show"
                        }
                    }
                    padding = "0";
                    if (width > height && width == 128) {
                        padding = parseInt((128 - height) / 2, 10) + "px 0"
                    }
                    if (width < 128 && height < 128) {
                        padding = parseInt((128 - height) / 2, 10) + "px 0"
                    }
                    uploadFiles.push(seq);
                    mainli = $(document.createElement("li"));
                    mainli.data({
                        seq: upfile.attr("seq"),
                        size: upfile.attr("size"),
                        "x-width": upfile.attr("width"),
                        "x-height": upfile.attr("height"),
                        lock: upfile.attr("lock"),
                        dir: upfile.attr("dir"),
                        file: upfile.attr("file")
                    });
                    mainli.attr("id", "file_" + seq);
                    mainli.attr("class", slrUpload.bbs);
                    mainli.attr("filepath", file);
                    if (view_type == "thumb") {
                        obj = $(document.createElement("img")).attr({
                            src: thumb,
                            "class": "thumbnail"
                        });
                        $(obj).css("padding", padding);
                        obj.on("click", slrUpload.selectDeleteFile);
                        mainli.append(obj);
                        obj = $(document.createElement("div")).addClass("thumb_command1");
                        obj.append($(document.createElement("img")).attr({
                            src: slrUpload.imgpath + "/img_bt_check.gif",
                            width: 18,
                            height: 18,
                            alt: "�щ꽕�� �좏깮"
                        }));
                        mainli.append(obj);
                        cont_panel = $(document.createElement("div")).addClass("thumb_command");
                        obj = $(document.createElement("div")).addClass("thumb_command2");
                        if (slrUpload.thumbUse == "true") {
                            obj.append($(document.createElement("img")).attr({
                                src: slrUpload.imgpath + "/img_bt_thumb.gif",
                                width: 18,
                                height: 18,
                                alt: "���쒖꽟�ㅼ씪 �좎젙"
                            }).addClass("bt_thumb"))
                        }
                        if (slrUpload.linkUse == "true") {
                            obj.append($(document.createElement("img")).attr({
                                src: slrUpload.imgpath + "/img_bt_link.gif",
                                width: 18,
                                height: 18,
                                alt: "留곹겕 �쎌엯"
                            }).addClass("bt_link"))
                        }
                        if (upfile.attr("lock") != "true") {
                            obj.append($(document.createElement("img")).attr({
                                src: slrUpload.imgpath + "/img_bt_delete.gif",
                                width: 18,
                                height: 18,
                                alt: "�뚯씪 ��젣"
                            }).addClass("bt_delete"))
                        }
                        cont_panel.append(obj);
                        cont_panel.append($(document.createElement("div")).addClass("thumb_command3 pop_thumb").append($(document.createElement("img")).attr({
                            src: slrUpload.imgpath + "/img_pop_thumb.png",
                            width: 114,
                            height: 64,
                            alt: "���� �щ꽕�쇱씠誘몄�濡� �좏깮�섏뿬 紐⑸줉�� �몄텧�⑸땲��"
                        })));
                        cont_panel.append($(document.createElement("div")).addClass("thumb_command3 pop_link").append($(document.createElement("img")).attr({
                            src: slrUpload.imgpath + "/img_pop_link.png",
                            width: 94,
                            height: 64,
                            alt: "�� �ъ쭊�� 留곹겕瑜� 寃뚯떆臾쇱뿉 異붽��⑸땲��"
                        })));
                        if (upfile.attr("lock") != "true") {
                            cont_panel.append($(document.createElement("div")).addClass("thumb_command3 pop_delete").append($(document.createElement("img")).attr({
                                src: slrUpload.imgpath + "/img_pop_delete.png",
                                width: 74,
                                height: 51,
                                alt: "�� �ъ쭊�� ��젣�⑸땲��"
                            })))
                        }
                        mainli.append(cont_panel);
                        mainli.append($(document.createElement("div")).addClass("thumb_command4" + mainImg_cl).append($(document.createElement("img")).attr({
                            src: slrUpload.imgpath + "/icon_thumb_tag.gif",
                            width: 59,
                            height: 13,
                            alt: "�꾩옱 ���� �щ꽕��"
                        })))
                    } else {
                        obj = $(document.createElement("div")).addClass("thumb_command1");
                        obj.append($(document.createElement("img")).attr({
                            src: slrUpload.imgpath + "/img_list_check.png",
                            width: 17,
                            height: 17,
                            alt: "�щ꽕�� �좏깮"
                        }));
                        mainli.append(obj);
                        obj = $(document.createElement("div")).addClass("file_url");
                        obj.text(file);
                        obj.on("click", slrUpload.selectDeleteFile);
                        mainli.append(obj);
                        if (slrUpload.linkUse == "true") {
                            obj = $(document.createElement("div")).addClass("thumb_command thumb_command2");
                            obj.append($(document.createElement("img")).attr({
                                src: slrUpload.imgpath + "/img_list_bt_link.gif",
                                width: 50,
                                height: 18,
                                alt: "留곹겕 �쎌엯"
                            }).addClass("bt_link"));
                            mainli.append(obj)
                        }
                        if (slrUpload.thumbUse == "true") {
                            obj = $(document.createElement("div")).addClass("thumb_command thumb_command3" + subImg_cl);
                            obj.append($(document.createElement("img")).attr({
                                src: slrUpload.imgpath + "/img_list_bt_thumb.gif",
                                width: 67,
                                height: 18,
                                alt: "���쒖꽟�ㅼ씪 �좎젙"
                            }).addClass("bt_thumb"));
                            mainli.append(obj)
                        }
                        obj = $(document.createElement("div")).addClass("thumb_command4" + mainImg_cl);
                        obj.append($(document.createElement("img")).attr({
                            src: slrUpload.imgpath + "/icon_thumb_tag.gif",
                            width: 59,
                            height: 13,
                            alt: "���쒖꽟�ㅼ씪"
                        }));
                        mainli.append(obj);
                        if (upfile.attr("lock") != "true") {
                            obj = $(document.createElement("div")).addClass("thumb_command thumb_command5");
                            obj.append($(document.createElement("img")).attr({
                                src: slrUpload.imgpath + "/img_list_bt_delete.gif",
                                width: 12,
                                height: 12,
                                alt: "�뚯씪 ��젣"
                            }).addClass("bt_delete"));
                            mainli.append(obj)
                        }
                    }
                    $("#file_upload .upload_list ul").append(mainli);
                    if (lat && lng && !a) {
                        try {
                            parent.setPos(chgGps(lat), chgGps(lng))
                        } catch (c) {}
                    }
                }
                if (view_type == "thumb") {
                    $("#file_upload .general_list").detach();
                    $("#file_upload .thumb_list").detach();
                    $("#file_upload .upload_list ul").addClass("thumb_list");
                    $("#file_upload .thumb_list li").mouseenter(function () {
                        $(".thumb_command", $(this)).addClass("show")
                    });
                    $("#file_upload .thumb_list li").mouseleave(function () {
                        $(".thumb_command", $(this)).removeClass("show")
                    });
                    $("#file_upload .thumb_list .thumb_command img").mouseenter(function () {
                        this.src = this.src.replace(".gif", "_on.gif");
                        if ($(this).attr("class") != null) {
                            tmp = $(this).attr("class").split("_");
                            prt = $(this).parent().parent().parent();
                            if (tmp[1]) {
                                $(".thumb_command .pop_" + tmp[1], $(prt)).addClass("show")
                            }
                        }
                    });
                    $("#file_upload .thumb_list .thumb_command img").mouseleave(function () {
                        this.src = this.src.replace("_on.gif", ".gif");
                        if ($(this).attr("class") != null) {
                            tmp = $(this).attr("class").split("_");
                            if (tmp[1]) {
                                $("#file_upload .thumb_list .thumb_command .pop_" + tmp[1]).removeClass("show")
                            }
                        }
                    })
                } else {
                    $("#file_upload .thumb_list").detach();
                    $("#file_upload .general_list").detach();
                    $("#file_upload .upload_list ul").addClass("general_list");
                    $("#file_upload .general_list li").mouseenter(function () {
                        $(this).addClass("sel_cl")
                    });
                    $("#file_upload .general_list li").mouseleave(function () {
                        $(this).removeClass("sel_cl")
                    });
                    $("#file_upload .general_list .thumb_command img").mouseenter(function () {
                        this.src = this.src.replace(".gif", "_on.gif")
                    });
                    $("#file_upload .general_list .thumb_command img").mouseleave(function () {
                        this.src = this.src.replace("_on.gif", ".gif")
                    });
                }
                $("img.bt_thumb", "#uplist").on("click", slrUpload.mainImgSet);
                $("img.bt_link", "#uplist").on("click", slrUpload.addImgLink);
                $("img.bt_delete", "#uplist").on("click", slrUpload.deleteUploadFile)
            }
        })
    }
};