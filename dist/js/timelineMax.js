/*!
 * VERSION: 1.18.0
 * DATE: 2015-08-29
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine(
        "TimelineMax",
        ["TimelineLite", "TweenLite", "easing.Ease"],
        function (t, e, i) {
            var s = function (e) {
                    t.call(this, e), (this._repeat = this.vars.repeat || 0), (this._repeatDelay = this.vars.repeatDelay || 0), (this._cycle = 0), (this._yoyo = this.vars.yoyo === !0), (this._dirty = !0);
                },
                r = 1e-10,
                n = e._internals,
                a = n.lazyTweens,
                o = n.lazyRender,
                h = new i(null, null, 1, 0),
                l = (s.prototype = new t());
            return (
                (l.constructor = s),
                (l.kill()._gc = !1),
                (s.version = "1.18.0"),
                (l.invalidate = function () {
                    return (this._yoyo = this.vars.yoyo === !0), (this._repeat = this.vars.repeat || 0), (this._repeatDelay = this.vars.repeatDelay || 0), this._uncache(!0), t.prototype.invalidate.call(this);
                }),
                (l.addCallback = function (t, i, s, r) {
                    return this.add(e.delayedCall(0, t, s, r), i);
                }),
                (l.removeCallback = function (t, e) {
                    if (t)
                        if (null == e) this._kill(null, t);
                        else for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1; ) i[s]._startTime === r && i[s]._enabled(!1, !1);
                    return this;
                }),
                (l.removePause = function (e) {
                    return this.removeCallback(t._internals.pauseCallback, e);
                }),
                (l.tweenTo = function (t, i) {
                    i = i || {};
                    var s,
                        r,
                        n,
                        a = { ease: h, useFrames: this.usesFrames(), immediateRender: !1 };
                    for (r in i) a[r] = i[r];
                    return (
                        (a.time = this._parseTimeOrLabel(t)),
                        (s = Math.abs(Number(a.time) - this._time) / this._timeScale || 0.001),
                        (n = new e(this, s, a)),
                        (a.onStart = function () {
                            n.target.paused(!0), n.vars.time !== n.target.time() && s === n.duration() && n.duration(Math.abs(n.vars.time - n.target.time()) / n.target._timeScale), i.onStart && n._callback("onStart");
                        }),
                        n
                    );
                }),
                (l.tweenFromTo = function (t, e, i) {
                    (i = i || {}), (t = this._parseTimeOrLabel(t)), (i.startAt = { onComplete: this.seek, onCompleteParams: [t], callbackScope: this }), (i.immediateRender = i.immediateRender !== !1);
                    var s = this.tweenTo(e, i);
                    return s.duration(Math.abs(s.vars.time - t) / this._timeScale || 0.001);
                }),
                (l.render = function (t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var s,
                        n,
                        h,
                        l,
                        _,
                        u,
                        c,
                        f = this._dirty ? this.totalDuration() : this._totalDuration,
                        m = this._duration,
                        p = this._time,
                        d = this._totalTime,
                        g = this._startTime,
                        v = this._timeScale,
                        y = this._rawPrevTime,
                        T = this._paused,
                        w = this._cycle;
                    if (t >= f)
                        this._locked || ((this._totalTime = f), (this._cycle = this._repeat)),
                            this._reversed ||
                                this._hasPausedChild() ||
                                ((n = !0), (l = "onComplete"), (_ = !!this._timeline.autoRemoveChildren), 0 === this._duration && (0 === t || 0 > y || y === r) && y !== t && this._first && ((_ = !0), y > r && (l = "onReverseComplete"))),
                            (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r),
                            this._yoyo && 0 !== (1 & this._cycle) ? (this._time = t = 0) : ((this._time = m), (t = m + 1e-4));
                    else if (1e-7 > t)
                        if (
                            (this._locked || (this._totalTime = this._cycle = 0),
                            (this._time = 0),
                            (0 !== p || (0 === m && y !== r && (y > 0 || (0 > t && y >= 0)) && !this._locked)) && ((l = "onReverseComplete"), (n = this._reversed)),
                            0 > t)
                        )
                            (this._active = !1), this._timeline.autoRemoveChildren && this._reversed ? ((_ = n = !0), (l = "onReverseComplete")) : y >= 0 && this._first && (_ = !0), (this._rawPrevTime = t);
                        else {
                            if (((this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : r), 0 === t && n)) for (s = this._first; s && 0 === s._startTime; ) s._duration || (n = !1), (s = s._next);
                            (t = 0), this._initted || (_ = !0);
                        }
                    else if (
                        (0 === m && 0 > y && (_ = !0),
                        (this._time = this._rawPrevTime = t),
                        this._locked ||
                            ((this._totalTime = t),
                            0 !== this._repeat &&
                                ((u = m + this._repeatDelay),
                                (this._cycle = (this._totalTime / u) >> 0),
                                0 !== this._cycle && this._cycle === this._totalTime / u && this._cycle--,
                                (this._time = this._totalTime - this._cycle * u),
                                this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time),
                                this._time > m ? ((this._time = m), (t = m + 1e-4)) : 0 > this._time ? (this._time = t = 0) : (t = this._time))),
                        this._hasPause && !this._forcingPlayhead && !e)
                    ) {
                        if (((t = this._time), t >= p)) for (s = this._first; s && t >= s._startTime && !c; ) s._duration || "isPause" !== s.data || s.ratio || (0 === s._startTime && 0 === this._rawPrevTime) || (c = s), (s = s._next);
                        else for (s = this._last; s && s._startTime >= t && !c; ) s._duration || ("isPause" === s.data && s._rawPrevTime > 0 && (c = s)), (s = s._prev);
                        c && ((this._time = t = c._startTime), (this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay)));
                    }
                    if (this._cycle !== w && !this._locked) {
                        var b = this._yoyo && 0 !== (1 & w),
                            x = b === (this._yoyo && 0 !== (1 & this._cycle)),
                            P = this._totalTime,
                            S = this._cycle,
                            k = this._rawPrevTime,
                            C = this._time;
                        if (
                            ((this._totalTime = w * m),
                            w > this._cycle ? (b = !b) : (this._totalTime += m),
                            (this._time = p),
                            (this._rawPrevTime = 0 === m ? y - 1e-4 : y),
                            (this._cycle = w),
                            (this._locked = !0),
                            (p = b ? 0 : m),
                            this.render(p, e, 0 === m),
                            e || this._gc || (this.vars.onRepeat && this._callback("onRepeat")),
                            x && ((p = b ? m + 1e-4 : -1e-4), this.render(p, !0, !1)),
                            (this._locked = !1),
                            this._paused && !T)
                        )
                            return;
                        (this._time = C), (this._totalTime = P), (this._cycle = S), (this._rawPrevTime = k);
                    }
                    if (!((this._time !== p && this._first) || i || _ || c)) return d !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")), void 0;
                    if (
                        (this._initted || (this._initted = !0),
                        this._active || (!this._paused && this._totalTime !== d && t > 0 && (this._active = !0)),
                        0 === d && this.vars.onStart && 0 !== this._totalTime && (e || this._callback("onStart")),
                        this._time >= p)
                    )
                        for (s = this._first; s && ((h = s._next), !this._paused || T); )
                            (s._active || (s._startTime <= this._time && !s._paused && !s._gc)) &&
                                (c === s && this.pause(), s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
                                (s = h);
                    else
                        for (s = this._last; s && ((h = s._prev), !this._paused || T); ) {
                            if (s._active || (p >= s._startTime && !s._paused && !s._gc)) {
                                if (c === s) {
                                    for (c = s._prev; c && c.endTime() > this._time; ) c.render(c._reversed ? c.totalDuration() - (t - c._startTime) * c._timeScale : (t - c._startTime) * c._timeScale, e, i), (c = c._prev);
                                    (c = null), this.pause();
                                }
                                s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i);
                            }
                            s = h;
                        }
                    this._onUpdate && (e || (a.length && o(), this._callback("onUpdate"))),
                        l &&
                            (this._locked ||
                                this._gc ||
                                ((g === this._startTime || v !== this._timeScale) &&
                                    (0 === this._time || f >= this.totalDuration()) &&
                                    (n && (a.length && o(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)), !e && this.vars[l] && this._callback(l))));
                }),
                (l.getActive = function (t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var s,
                        r,
                        n = [],
                        a = this.getChildren(t, e, i),
                        o = 0,
                        h = a.length;
                    for (s = 0; h > s; s++) (r = a[s]), r.isActive() && (n[o++] = r);
                    return n;
                }),
                (l.getLabelAfter = function (t) {
                    t || (0 !== t && (t = this._time));
                    var e,
                        i = this.getLabelsArray(),
                        s = i.length;
                    for (e = 0; s > e; e++) if (i[e].time > t) return i[e].name;
                    return null;
                }),
                (l.getLabelBefore = function (t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1; ) if (t > e[i].time) return e[i].name;
                    return null;
                }),
                (l.getLabelsArray = function () {
                    var t,
                        e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = { time: this._labels[t], name: t };
                    return (
                        e.sort(function (t, e) {
                            return t.time - e.time;
                        }),
                        e
                    );
                }),
                (l.progress = function (t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration();
                }),
                (l.totalProgress = function (t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration();
                }),
                (l.totalDuration = function (e) {
                    return arguments.length
                        ? -1 === this._repeat
                            ? this
                            : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1))
                        : (this._dirty && (t.prototype.totalDuration.call(this), (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat)), this._totalDuration);
                }),
                (l.time = function (t, e) {
                    return arguments.length
                        ? (this._dirty && this.totalDuration(),
                          t > this._duration && (t = this._duration),
                          this._yoyo && 0 !== (1 & this._cycle) ? (t = this._duration - t + this._cycle * (this._duration + this._repeatDelay)) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
                          this.totalTime(t, e))
                        : this._time;
                }),
                (l.repeat = function (t) {
                    return arguments.length ? ((this._repeat = t), this._uncache(!0)) : this._repeat;
                }),
                (l.repeatDelay = function (t) {
                    return arguments.length ? ((this._repeatDelay = t), this._uncache(!0)) : this._repeatDelay;
                }),
                (l.yoyo = function (t) {
                    return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
                }),
                (l.currentLabel = function (t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8);
                }),
                s
            );
        },
        !0
    ),
        _gsScope._gsDefine(
            "TimelineLite",
            ["core.Animation", "core.SimpleTimeline", "TweenLite"],
            function (t, e, i) {
                var s = function (t) {
                        e.call(this, t),
                            (this._labels = {}),
                            (this.autoRemoveChildren = this.vars.autoRemoveChildren === !0),
                            (this.smoothChildTiming = this.vars.smoothChildTiming === !0),
                            (this._sortChildren = !0),
                            (this._onUpdate = this.vars.onUpdate);
                        var i,
                            s,
                            r = this.vars;
                        for (s in r) (i = r[s]), h(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
                        h(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
                    },
                    r = 1e-10,
                    n = i._internals,
                    a = (s._internals = {}),
                    o = n.isSelector,
                    h = n.isArray,
                    l = n.lazyTweens,
                    _ = n.lazyRender,
                    u = _gsScope._gsDefine.globals,
                    c = function (t) {
                        var e,
                            i = {};
                        for (e in t) i[e] = t[e];
                        return i;
                    },
                    f = function (t, e, i) {
                        var s,
                            r,
                            n = t.cycle;
                        for (s in n) (r = n[s]), (t[s] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length]);
                        delete t.cycle;
                    },
                    m = (a.pauseCallback = function () {}),
                    p = function (t) {
                        var e,
                            i = [],
                            s = t.length;
                        for (e = 0; e !== s; i.push(t[e++]));
                        return i;
                    },
                    d = (s.prototype = new e());
                return (
                    (s.version = "1.18.0"),
                    (d.constructor = s),
                    (d.kill()._gc = d._forcingPlayhead = d._hasPause = !1),
                    (d.to = function (t, e, s, r) {
                        var n = (s.repeat && u.TweenMax) || i;
                        return e ? this.add(new n(t, e, s), r) : this.set(t, s, r);
                    }),
                    (d.from = function (t, e, s, r) {
                        return this.add(((s.repeat && u.TweenMax) || i).from(t, e, s), r);
                    }),
                    (d.fromTo = function (t, e, s, r, n) {
                        var a = (r.repeat && u.TweenMax) || i;
                        return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n);
                    }),
                    (d.staggerTo = function (t, e, r, n, a, h, l, _) {
                        var u,
                            m,
                            d = new s({ onComplete: h, onCompleteParams: l, callbackScope: _, smoothChildTiming: this.smoothChildTiming }),
                            g = r.cycle;
                        for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], o(t) && (t = p(t)), n = n || 0, 0 > n && ((t = p(t)), t.reverse(), (n *= -1)), m = 0; t.length > m; m++)
                            (u = c(r)), u.startAt && ((u.startAt = c(u.startAt)), u.startAt.cycle && f(u.startAt, t, m)), g && f(u, t, m), d.to(t[m], e, u, m * n);
                        return this.add(d, a);
                    }),
                    (d.staggerFrom = function (t, e, i, s, r, n, a, o) {
                        return (i.immediateRender = 0 != i.immediateRender), (i.runBackwards = !0), this.staggerTo(t, e, i, s, r, n, a, o);
                    }),
                    (d.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
                        return (s.startAt = i), (s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender), this.staggerTo(t, e, s, r, n, a, o, h);
                    }),
                    (d.call = function (t, e, s, r) {
                        return this.add(i.delayedCall(0, t, e, s), r);
                    }),
                    (d.set = function (t, e, s) {
                        return (s = this._parseTimeOrLabel(s, 0, !0)), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s);
                    }),
                    (s.exportRoot = function (t, e) {
                        (t = t || {}), null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                        var r,
                            n,
                            a = new s(t),
                            o = a._timeline;
                        for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r; )
                            (n = r._next), (e && r instanceof i && r.target === r.vars.onComplete) || a.add(r, r._startTime - r._delay), (r = n);
                        return o.add(a, 0), a;
                    }),
                    (d.add = function (r, n, a, o) {
                        var l, _, u, c, f, m;
                        if (("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t))) {
                            if (r instanceof Array || (r && r.push && h(r))) {
                                for (a = a || "normal", o = o || 0, l = n, _ = r.length, u = 0; _ > u; u++)
                                    h((c = r[u])) && (c = new s({ tweens: c })),
                                        this.add(c, l),
                                        "string" != typeof c && "function" != typeof c && ("sequence" === a ? (l = c._startTime + c.totalDuration() / c._timeScale) : "start" === a && (c._startTime -= c.delay())),
                                        (l += o);
                                return this._uncache(!0);
                            }
                            if ("string" == typeof r) return this.addLabel(r, n);
                            if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                            r = i.delayedCall(0, r);
                        }
                        if ((e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()))
                            for (f = this, m = f.rawTime() > r._startTime; f._timeline; ) m && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1), (f = f._timeline);
                        return this;
                    }),
                    (d.remove = function (e) {
                        if (e instanceof t) {
                            this._remove(e, !1);
                            var i = (e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline);
                            return (e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale), this;
                        }
                        if (e instanceof Array || (e && e.push && h(e))) {
                            for (var s = e.length; --s > -1; ) this.remove(e[s]);
                            return this;
                        }
                        return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e);
                    }),
                    (d._remove = function (t, i) {
                        e.prototype._remove.call(this, t, i);
                        var s = this._last;
                        return (
                            s
                                ? this._time > s._startTime + s._totalDuration / s._timeScale && ((this._time = this.duration()), (this._totalTime = this._totalDuration))
                                : (this._time = this._totalTime = this._duration = this._totalDuration = 0),
                            this
                        );
                    }),
                    (d.append = function (t, e) {
                        return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
                    }),
                    (d.insert = d.insertMultiple = function (t, e, i, s) {
                        return this.add(t, e || 0, i, s);
                    }),
                    (d.appendMultiple = function (t, e, i, s) {
                        return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s);
                    }),
                    (d.addLabel = function (t, e) {
                        return (this._labels[t] = this._parseTimeOrLabel(e)), this;
                    }),
                    (d.addPause = function (t, e, s, r) {
                        var n = i.delayedCall(0, m, s, r || this);
                        return (n.vars.onComplete = n.vars.onReverseComplete = e), (n.data = "isPause"), (this._hasPause = !0), this.add(n, t);
                    }),
                    (d.removeLabel = function (t) {
                        return delete this._labels[t], this;
                    }),
                    (d.getLabelTime = function (t) {
                        return null != this._labels[t] ? this._labels[t] : -1;
                    }),
                    (d._parseTimeOrLabel = function (e, i, s, r) {
                        var n;
                        if (r instanceof t && r.timeline === this) this.remove(r);
                        else if (r && (r instanceof Array || (r.push && h(r)))) for (n = r.length; --n > -1; ) r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
                        if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
                        if (((i = i || 0), "string" != typeof e || (!isNaN(e) && null == this._labels[e]))) null == e && (e = this.duration());
                        else {
                            if (((n = e.indexOf("=")), -1 === n)) return null == this._labels[e] ? (s ? (this._labels[e] = this.duration() + i) : i) : this._labels[e] + i;
                            (i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1))), (e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration());
                        }
                        return Number(e) + i;
                    }),
                    (d.seek = function (t, e) {
                        return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1);
                    }),
                    (d.stop = function () {
                        return this.paused(!0);
                    }),
                    (d.gotoAndPlay = function (t, e) {
                        return this.play(t, e);
                    }),
                    (d.gotoAndStop = function (t, e) {
                        return this.pause(t, e);
                    }),
                    (d.render = function (t, e, i) {
                        this._gc && this._enabled(!0, !1);
                        var s,
                            n,
                            a,
                            o,
                            h,
                            u,
                            c = this._dirty ? this.totalDuration() : this._totalDuration,
                            f = this._time,
                            m = this._startTime,
                            p = this._timeScale,
                            d = this._paused;
                        if (t >= c)
                            (this._totalTime = this._time = c),
                                this._reversed ||
                                    this._hasPausedChild() ||
                                    ((n = !0),
                                    (o = "onComplete"),
                                    (h = !!this._timeline.autoRemoveChildren),
                                    0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && ((h = !0), this._rawPrevTime > r && (o = "onReverseComplete"))),
                                (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r),
                                (t = c + 1e-4);
                        else if (1e-7 > t)
                            if (
                                ((this._totalTime = this._time = 0),
                                (0 !== f || (0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || (0 > t && this._rawPrevTime >= 0)))) && ((o = "onReverseComplete"), (n = this._reversed)),
                                0 > t)
                            )
                                (this._active = !1), this._timeline.autoRemoveChildren && this._reversed ? ((h = n = !0), (o = "onReverseComplete")) : this._rawPrevTime >= 0 && this._first && (h = !0), (this._rawPrevTime = t);
                            else {
                                if (((this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r), 0 === t && n)) for (s = this._first; s && 0 === s._startTime; ) s._duration || (n = !1), (s = s._next);
                                (t = 0), this._initted || (h = !0);
                            }
                        else {
                            if (this._hasPause && !this._forcingPlayhead && !e) {
                                if (t >= f) for (s = this._first; s && t >= s._startTime && !u; ) s._duration || "isPause" !== s.data || s.ratio || (0 === s._startTime && 0 === this._rawPrevTime) || (u = s), (s = s._next);
                                else for (s = this._last; s && s._startTime >= t && !u; ) s._duration || ("isPause" === s.data && s._rawPrevTime > 0 && (u = s)), (s = s._prev);
                                u && ((this._time = t = u._startTime), (this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay)));
                            }
                            this._totalTime = this._time = this._rawPrevTime = t;
                        }
                        if ((this._time !== f && this._first) || i || h || u) {
                            if (
                                (this._initted || (this._initted = !0),
                                this._active || (!this._paused && this._time !== f && t > 0 && (this._active = !0)),
                                0 === f && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")),
                                this._time >= f)
                            )
                                for (s = this._first; s && ((a = s._next), !this._paused || d); )
                                    (s._active || (s._startTime <= this._time && !s._paused && !s._gc)) &&
                                        (u === s && this.pause(), s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
                                        (s = a);
                            else
                                for (s = this._last; s && ((a = s._prev), !this._paused || d); ) {
                                    if (s._active || (f >= s._startTime && !s._paused && !s._gc)) {
                                        if (u === s) {
                                            for (u = s._prev; u && u.endTime() > this._time; ) u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i), (u = u._prev);
                                            (u = null), this.pause();
                                        }
                                        s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i);
                                    }
                                    s = a;
                                }
                            this._onUpdate && (e || (l.length && _(), this._callback("onUpdate"))),
                                o &&
                                    (this._gc ||
                                        ((m === this._startTime || p !== this._timeScale) &&
                                            (0 === this._time || c >= this.totalDuration()) &&
                                            (n && (l.length && _(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), (this._active = !1)), !e && this.vars[o] && this._callback(o))));
                        }
                    }),
                    (d._hasPausedChild = function () {
                        for (var t = this._first; t; ) {
                            if (t._paused || (t instanceof s && t._hasPausedChild())) return !0;
                            t = t._next;
                        }
                        return !1;
                    }),
                    (d.getChildren = function (t, e, s, r) {
                        r = r || -9999999999;
                        for (var n = [], a = this._first, o = 0; a; )
                            r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && ((n = n.concat(a.getChildren(!0, e, s))), (o = n.length)))), (a = a._next);
                        return n;
                    }),
                    (d.getTweensOf = function (t, e) {
                        var s,
                            r,
                            n = this._gc,
                            a = [],
                            o = 0;
                        for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1; ) (s[r].timeline === this || (e && this._contains(s[r]))) && (a[o++] = s[r]);
                        return n && this._enabled(!1, !0), a;
                    }),
                    (d.recent = function () {
                        return this._recent;
                    }),
                    (d._contains = function (t) {
                        for (var e = t.timeline; e; ) {
                            if (e === this) return !0;
                            e = e.timeline;
                        }
                        return !1;
                    }),
                    (d.shiftChildren = function (t, e, i) {
                        i = i || 0;
                        for (var s, r = this._first, n = this._labels; r; ) r._startTime >= i && (r._startTime += t), (r = r._next);
                        if (e) for (s in n) n[s] >= i && (n[s] += t);
                        return this._uncache(!0);
                    }),
                    (d._kill = function (t, e) {
                        if (!t && !e) return this._enabled(!1, !1);
                        for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1; ) i[s]._kill(t, e) && (r = !0);
                        return r;
                    }),
                    (d.clear = function (t) {
                        var e = this.getChildren(!1, !0, !0),
                            i = e.length;
                        for (this._time = this._totalTime = 0; --i > -1; ) e[i]._enabled(!1, !1);
                        return t !== !1 && (this._labels = {}), this._uncache(!0);
                    }),
                    (d.invalidate = function () {
                        for (var e = this._first; e; ) e.invalidate(), (e = e._next);
                        return t.prototype.invalidate.call(this);
                    }),
                    (d._enabled = function (t, i) {
                        if (t === this._gc) for (var s = this._first; s; ) s._enabled(t, !0), (s = s._next);
                        return e.prototype._enabled.call(this, t, i);
                    }),
                    (d.totalTime = function () {
                        this._forcingPlayhead = !0;
                        var e = t.prototype.totalTime.apply(this, arguments);
                        return (this._forcingPlayhead = !1), e;
                    }),
                    (d.duration = function (t) {
                        return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration);
                    }),
                    (d.totalDuration = function (t) {
                        if (!arguments.length) {
                            if (this._dirty) {
                                for (var e, i, s = 0, r = this._last, n = 999999999999; r; )
                                    (e = r._prev),
                                        r._dirty && r.totalDuration(),
                                        r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : (n = r._startTime),
                                        0 > r._startTime &&
                                            !r._paused &&
                                            ((s -= r._startTime), this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), (n = 0)),
                                        (i = r._startTime + r._totalDuration / r._timeScale),
                                        i > s && (s = i),
                                        (r = e);
                                (this._duration = this._totalDuration = s), (this._dirty = !1);
                            }
                            return this._totalDuration;
                        }
                        return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this;
                    }),
                    (d.paused = function (e) {
                        if (!e) for (var i = this._first, s = this._time; i; ) i._startTime === s && "isPause" === i.data && (i._rawPrevTime = 0), (i = i._next);
                        return t.prototype.paused.apply(this, arguments);
                    }),
                    (d.usesFrames = function () {
                        for (var e = this._timeline; e._timeline; ) e = e._timeline;
                        return e === t._rootFramesTimeline;
                    }),
                    (d.rawTime = function () {
                        return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
                    }),
                    s
                );
            },
            !0
        );
}),
    _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    (function (t) {
        "use strict";
        var e = function () {
            return (_gsScope.GreenSockGlobals || _gsScope)[t];
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"), (module.exports = e()));
    })("TimelineMax");
