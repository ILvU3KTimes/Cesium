define([
  "exports",
  "./when-54c2dc71",
  "./Check-6c0211bc",
  "./Math-fc8cecf5",
  "./Cartesian2-bddc1162",
  "./Transforms-d07bb42c",
], function (a, d, t, O, x, y) {
  "use strict";
  var P = {};
  function i(a, t, e) {
    var r = a + t;
    return O.CesiumMath.sign(a) !== O.CesiumMath.sign(t) &&
      Math.abs(r / Math.max(Math.abs(a), Math.abs(t))) < e
      ? 0
      : r;
  }
  (P.computeDiscriminant = function (a, t, e) {
    return t * t - 4 * a * e;
  }),
    (P.computeRealRoots = function (a, t, e) {
      if (0 === a) return 0 === t ? [] : [-e / t];
      if (0 === t) {
        if (0 === e) return [0, 0];
        var r = Math.abs(e),
          n = Math.abs(a);
        if (r < n && r / n < O.CesiumMath.EPSILON14) return [0, 0];
        if (n < r && n / r < O.CesiumMath.EPSILON14) return [];
        if ((n = -e / a) < 0) return [];
        r = Math.sqrt(n);
        return [-r, r];
      }
      if (0 === e) return (n = -t / a) < 0 ? [n, 0] : [0, n];
      n = i(t * t, -(4 * a * e), O.CesiumMath.EPSILON14);
      if (n < 0) return [];
      n =
        -0.5 *
        i(t, O.CesiumMath.sign(t) * Math.sqrt(n), O.CesiumMath.EPSILON14);
      return 0 < t ? [n / a, e / n] : [e / n, n / a];
    });
  var g = {};
  function s(a, t, e, r) {
    var n = a,
      i = t / 3,
      s = e / 3,
      o = r,
      u = n * s,
      c = i * o,
      C = i * i,
      l = s * s,
      h = n * s - C,
      a = n * o - i * s,
      t = i * o - l,
      e = 4 * h * t - a * a;
    if (e < 0) {
      var r =
          u * l <= C * c
            ? -2 * i * (m = h) + (f = n) * a
            : -(f = o) * a + 2 * s * (m = t),
        M = -(r < 0 ? -1 : 1) * Math.abs(f) * Math.sqrt(-e),
        f = (d = M - r) / 2,
        f = f < 0 ? -Math.pow(-f, 1 / 3) : Math.pow(f, 1 / 3),
        M = d === M ? -f : -m / f,
        M = m <= 0 ? f + M : -r / (f * f + M * M + m);
      return u * l <= C * c ? [(M - i) / n] : [-o / (M + s)];
    }
    var m = h,
      u = -2 * i * h + n * a,
      l = t,
      C = -o * a + 2 * s * t,
      c = Math.sqrt(e),
      h = Math.sqrt(3) / 2,
      a = Math.abs(Math.atan2(n * c, -u) / 3);
    M = 2 * Math.sqrt(-m);
    t = Math.cos(a);
    d = M * t;
    var e = M * (-t / 2 - h * Math.sin(a)),
      u = 2 * i < d + e ? d - i : e - i,
      m = n,
      n = u / m,
      a = Math.abs(Math.atan2(o * c, -C) / 3),
      o = -o,
      a =
        (d = (M = 2 * Math.sqrt(-l)) * (t = Math.cos(a))) +
          (e = M * (-t / 2 - h * Math.sin(a))) <
        2 * s
          ? d + s
          : e + s,
      d = o / a,
      e = -u * a - m * o,
      a = (s * e - i * (u * o)) / (-i * e + s * (m * a));
    return n <= a
      ? n <= d
        ? a <= d
          ? [n, a, d]
          : [n, d, a]
        : [d, n, a]
      : n <= d
      ? [a, n, d]
      : a <= d
      ? [a, d, n]
      : [d, a, n];
  }
  (g.computeDiscriminant = function (a, t, e, r) {
    var n = t * t,
      i = e * e;
    return (
      18 * a * t * e * r +
      n * i -
      27 * (a * a) * (r * r) -
      4 * (a * i * e + n * t * r)
    );
  }),
    (g.computeRealRoots = function (a, t, e, r) {
      var n;
      if (0 === a) return P.computeRealRoots(t, e, r);
      if (0 !== t)
        return 0 === e
          ? 0 === r
            ? (i = -t / a) < 0
              ? [i, 0, 0]
              : [0, 0, i]
            : s(a, t, 0, r)
          : 0 === r
          ? 0 === (n = P.computeRealRoots(a, t, e)).length
            ? [0]
            : n[1] <= 0
            ? [n[0], n[1], 0]
            : 0 <= n[0]
            ? [0, n[0], n[1]]
            : [n[0], 0, n[1]]
          : s(a, t, e, r);
      if (0 !== e)
        return 0 === r
          ? 0 === (n = P.computeRealRoots(a, 0, e)).Length
            ? [0]
            : [n[0], 0, n[1]]
          : s(a, 0, e, r);
      if (0 === r) return [0, 0, 0];
      var i = (i = -r / a) < 0 ? -Math.pow(-i, 1 / 3) : Math.pow(i, 1 / 3);
      return [i, i, i];
    });
  var b = {};
  function o(a, t, e, r) {
    var n = a * a,
      i = t - (3 * n) / 8,
      s = e - (t * a) / 2 + (n * a) / 8,
      r = r - (e * a) / 4 + (t * n) / 16 - (3 * n * n) / 256,
      e = g.computeRealRoots(1, 2 * i, i * i - 4 * r, -s * s);
    if (0 < e.length) {
      (t = -a / 4), (n = e[e.length - 1]);
      if (Math.abs(n) < O.CesiumMath.EPSILON14) {
        a = P.computeRealRoots(1, i, r);
        if (2 === a.length) {
          var e = a[0],
            o = a[1];
          if (0 <= e && 0 <= o) {
            (r = Math.sqrt(e)), (a = Math.sqrt(o));
            return [t - a, t - r, t + r, t + a];
          }
          if (0 <= e && o < 0) return [t - (u = Math.sqrt(e)), t + u];
          if (e < 0 && 0 <= o) return [t - (u = Math.sqrt(o)), t + u];
        }
        return [];
      }
      if (0 < n) {
        var o = Math.sqrt(n),
          u = (i + n - s / o) / 2,
          s = (i + n + s / o) / 2,
          u = P.computeRealRoots(1, o, u),
          s = P.computeRealRoots(1, -o, s);
        return 0 !== u.length
          ? ((u[0] += t),
            (u[1] += t),
            0 !== s.length
              ? ((s[0] += t),
                (s[1] += t),
                u[1] <= s[0]
                  ? [u[0], u[1], s[0], s[1]]
                  : s[1] <= u[0]
                  ? [s[0], s[1], u[0], u[1]]
                  : u[0] >= s[0] && u[1] <= s[1]
                  ? [s[0], u[0], u[1], s[1]]
                  : s[0] >= u[0] && s[1] <= u[1]
                  ? [u[0], s[0], s[1], u[1]]
                  : u[0] > s[0] && u[0] < s[1]
                  ? [s[0], u[0], s[1], u[1]]
                  : [u[0], s[0], u[1], s[1]])
              : u)
          : 0 !== s.length
          ? ((s[0] += t), (s[1] += t), s)
          : [];
      }
    }
    return [];
  }
  function u(a, t, e, r) {
    var n = a * a,
      i = -2 * t,
      s = e * a + t * t - 4 * r,
      o = n * r - e * t * a + e * e,
      u = g.computeRealRoots(1, i, s, o);
    if (0 < u.length) {
      var c,
        C,
        l,
        h,
        M = u[0],
        i = t - M,
        s = i * i,
        o = a / 2,
        u = i / 2,
        t = s - 4 * r,
        i = s + 4 * Math.abs(r),
        s = n - 4 * M,
        n = n + 4 * Math.abs(M);
      (C =
        M < 0 || t * n < s * i
          ? ((c = (s = Math.sqrt(s)) / 2), 0 === s ? 0 : (a * u - e) / s)
          : ((c = 0 === (C = Math.sqrt(t)) ? 0 : (a * u - e) / C), C / 2)),
        0 == o && 0 === c
          ? (h = l = 0)
          : O.CesiumMath.sign(o) === O.CesiumMath.sign(c)
          ? (h = M / (l = o + c))
          : (l = M / (h = o - c)),
        0 == u && 0 === C
          ? (m = f = 0)
          : O.CesiumMath.sign(u) === O.CesiumMath.sign(C)
          ? (m = r / (f = u + C))
          : (f = r / (m = u - C));
      var f = P.computeRealRoots(1, l, f),
        m = P.computeRealRoots(1, h, m);
      if (0 !== f.length)
        return 0 !== m.length
          ? f[1] <= m[0]
            ? [f[0], f[1], m[0], m[1]]
            : m[1] <= f[0]
            ? [m[0], m[1], f[0], f[1]]
            : f[0] >= m[0] && f[1] <= m[1]
            ? [m[0], f[0], f[1], m[1]]
            : m[0] >= f[0] && m[1] <= f[1]
            ? [f[0], m[0], m[1], f[1]]
            : f[0] > m[0] && f[0] < m[1]
            ? [m[0], f[0], m[1], f[1]]
            : [f[0], m[0], f[1], m[1]]
          : f;
      if (0 !== m.length) return m;
    }
    return [];
  }
  function e(a, t) {
    (t = x.Cartesian3.clone(d.defaultValue(t, x.Cartesian3.ZERO))),
      x.Cartesian3.equals(t, x.Cartesian3.ZERO) || x.Cartesian3.normalize(t, t),
      (this.origin = x.Cartesian3.clone(d.defaultValue(a, x.Cartesian3.ZERO))),
      (this.direction = t);
  }
  (b.computeDiscriminant = function (a, t, e, r, n) {
    var i = a * a,
      s = t * t,
      o = s * t,
      u = e * e,
      c = u * e,
      C = r * r,
      l = C * r,
      h = n * n;
    return (
      s * u * C -
      4 * o * l -
      4 * a * c * C +
      18 * a * t * e * l -
      27 * i * C * C +
      256 * (i * a) * (h * n) +
      n *
        (18 * o * e * r -
          4 * s * c +
          16 * a * u * u -
          80 * a * t * u * r -
          6 * a * s * C +
          144 * i * e * C) +
      h * (144 * a * s * e - 27 * s * s - 128 * i * u - 192 * i * t * r)
    );
  }),
    (b.computeRealRoots = function (a, t, e, r, n) {
      if (Math.abs(a) < O.CesiumMath.EPSILON15)
        return g.computeRealRoots(t, e, r, n);
      (t /= a), (e /= a), (r /= a), (n /= a), (a = t < 0 ? 1 : 0);
      switch (
        ((a += e < 0 ? a + 1 : a),
        (a += r < 0 ? a + 1 : a),
        (a += n < 0 ? a + 1 : a))
      ) {
        case 0:
          return o(t, e, r, n);
        case 1:
        case 2:
          return u(t, e, r, n);
        case 3:
        case 4:
          return o(t, e, r, n);
        case 5:
          return u(t, e, r, n);
        case 6:
        case 7:
          return o(t, e, r, n);
        case 8:
          return u(t, e, r, n);
        case 9:
        case 10:
          return o(t, e, r, n);
        case 11:
          return u(t, e, r, n);
        case 12:
        case 13:
        case 14:
        case 15:
          return o(t, e, r, n);
        default:
          return;
      }
    }),
    (e.clone = function (a, t) {
      if (d.defined(a))
        return d.defined(t)
          ? ((t.origin = x.Cartesian3.clone(a.origin)),
            (t.direction = x.Cartesian3.clone(a.direction)),
            t)
          : new e(a.origin, a.direction);
    }),
    (e.getPoint = function (a, t, e) {
      return (
        d.defined(e) || (e = new x.Cartesian3()),
        (e = x.Cartesian3.multiplyByScalar(a.direction, t, e)),
        x.Cartesian3.add(a.origin, e, e)
      );
    });
  var C = {
      rayPlane: function (a, t, e) {
        d.defined(e) || (e = new x.Cartesian3());
        var r = a.origin,
          n = a.direction,
          i = t.normal,
          a = x.Cartesian3.dot(i, n);
        if (!(Math.abs(a) < O.CesiumMath.EPSILON15)) {
          a = (-t.distance - x.Cartesian3.dot(i, r)) / a;
          if (!(a < 0))
            return (
              (e = x.Cartesian3.multiplyByScalar(n, a, e)),
              x.Cartesian3.add(r, e, e)
            );
        }
      },
    },
    M = new x.Cartesian3(),
    f = new x.Cartesian3(),
    m = new x.Cartesian3(),
    p = new x.Cartesian3(),
    v = new x.Cartesian3();
  (C.rayTriangleParametric = function (a, t, e, r, n) {
    n = d.defaultValue(n, !1);
    var i,
      s,
      o,
      u = a.origin,
      c = a.direction,
      C = x.Cartesian3.subtract(e, t, M),
      a = x.Cartesian3.subtract(r, t, f),
      e = x.Cartesian3.cross(c, a, m),
      r = x.Cartesian3.dot(C, e);
    if (n) {
      if (r < O.CesiumMath.EPSILON6) return;
      if (
        ((h = x.Cartesian3.subtract(u, t, p)),
        (l = x.Cartesian3.dot(h, e)) < 0 || r < l)
      )
        return;
      if (
        ((i = x.Cartesian3.cross(h, C, v)),
        (s = x.Cartesian3.dot(c, i)) < 0 || r < l + s)
      )
        return;
      o = x.Cartesian3.dot(a, i) / r;
    } else {
      if (Math.abs(r) < O.CesiumMath.EPSILON6) return;
      var l,
        r = 1 / r,
        h = x.Cartesian3.subtract(u, t, p);
      if ((l = x.Cartesian3.dot(h, e) * r) < 0 || 1 < l) return;
      if (
        ((i = x.Cartesian3.cross(h, C, v)),
        (s = x.Cartesian3.dot(c, i) * r) < 0 || 1 < l + s)
      )
        return;
      o = x.Cartesian3.dot(a, i) * r;
    }
    return o;
  }),
    (C.rayTriangle = function (a, t, e, r, n, i) {
      n = C.rayTriangleParametric(a, t, e, r, n);
      if (d.defined(n) && !(n < 0))
        return (
          d.defined(i) || (i = new x.Cartesian3()),
          x.Cartesian3.multiplyByScalar(a.direction, n, i),
          x.Cartesian3.add(a.origin, i, i)
        );
    });
  var c = new e();
  C.lineSegmentTriangle = function (a, t, e, r, n, i, s) {
    var o = c;
    x.Cartesian3.clone(a, o.origin),
      x.Cartesian3.subtract(t, a, o.direction),
      x.Cartesian3.normalize(o.direction, o.direction);
    i = C.rayTriangleParametric(o, e, r, n, i);
    if (!(!d.defined(i) || i < 0 || i > x.Cartesian3.distance(a, t)))
      return (
        d.defined(s) || (s = new x.Cartesian3()),
        x.Cartesian3.multiplyByScalar(o.direction, i, s),
        x.Cartesian3.add(o.origin, s, s)
      );
  };
  var l = { root0: 0, root1: 0 };
  function h(a, t, e) {
    d.defined(e) || (e = new y.Interval());
    var r = a.origin,
      n = a.direction,
      a = t.center,
      t = t.radius * t.radius,
      a = x.Cartesian3.subtract(r, a, m),
      t = (function (a, t, e, r) {
        if (!((i = t * t - 4 * a * e) < 0)) {
          if (0 < i) {
            var n = 1 / (2 * a),
              e = Math.sqrt(i),
              i = (-t + e) * n,
              n = (-t - e) * n;
            return (
              i < n
                ? ((r.root0 = i), (r.root1 = n))
                : ((r.root0 = n), (r.root1 = i)),
              r
            );
          }
          a = -t / (2 * a);
          if (0 != a) return (r.root0 = r.root1 = a), r;
        }
      })(
        x.Cartesian3.dot(n, n),
        2 * x.Cartesian3.dot(n, a),
        x.Cartesian3.magnitudeSquared(a) - t,
        l
      );
    if (d.defined(t)) return (e.start = t.root0), (e.stop = t.root1), e;
  }
  C.raySphere = function (a, t, e) {
    if (((e = h(a, t, e)), d.defined(e) && !(e.stop < 0)))
      return (e.start = Math.max(e.start, 0)), e;
  };
  var w = new e();
  C.lineSegmentSphere = function (a, t, e, r) {
    var n = w;
    x.Cartesian3.clone(a, n.origin);
    (t = x.Cartesian3.subtract(t, a, n.direction)),
      (a = x.Cartesian3.magnitude(t));
    if (
      (x.Cartesian3.normalize(t, t),
      (r = h(n, e, r)),
      !(!d.defined(r) || r.stop < 0 || r.start > a))
    )
      return (
        (r.start = Math.max(r.start, 0)), (r.stop = Math.min(r.stop, a)), r
      );
  };
  var R = new x.Cartesian3(),
    S = new x.Cartesian3();
  function N(a, t, e) {
    var r = a + t;
    return O.CesiumMath.sign(a) !== O.CesiumMath.sign(t) &&
      Math.abs(r / Math.max(Math.abs(a), Math.abs(t))) < e
      ? 0
      : r;
  }
  C.rayEllipsoid = function (a, t) {
    var e,
      r,
      n = t.oneOverRadii,
      i = x.Cartesian3.multiplyComponents(n, a.origin, R),
      t = x.Cartesian3.multiplyComponents(n, a.direction, S),
      n = x.Cartesian3.magnitudeSquared(i),
      a = x.Cartesian3.dot(i, t);
    if (1 < n) {
      if (0 <= a) return;
      var s,
        o,
        i = a * a,
        u = n - 1;
      if (i < (o = (s = x.Cartesian3.magnitudeSquared(t)) * u)) return;
      if (o < i) {
        e = a * a - o;
        var c = (r = -a + Math.sqrt(e)) / s,
          i = u / r;
        return c < i ? new y.Interval(c, i) : { start: i, stop: c };
      }
      c = Math.sqrt(u / s);
      return new y.Interval(c, c);
    }
    return n < 1
      ? ((u = n - 1),
        (e = a * a - (o = (s = x.Cartesian3.magnitudeSquared(t)) * u)),
        (r = -a + Math.sqrt(e)),
        new y.Interval(0, r / s))
      : a < 0
      ? ((s = x.Cartesian3.magnitudeSquared(t)), new y.Interval(0, -a / s))
      : void 0;
  };
  var q = new x.Cartesian3(),
    L = new x.Cartesian3(),
    I = new x.Cartesian3(),
    E = new x.Cartesian3(),
    z = new x.Cartesian3(),
    T = new y.Matrix3(),
    U = new y.Matrix3(),
    W = new y.Matrix3(),
    B = new y.Matrix3(),
    V = new y.Matrix3(),
    Z = new y.Matrix3(),
    A = new y.Matrix3(),
    D = new x.Cartesian3(),
    k = new x.Cartesian3(),
    F = new x.Cartographic();
  C.grazingAltitudeLocation = function (a, t) {
    var e = a.origin,
      r = a.direction;
    if (!x.Cartesian3.equals(e, x.Cartesian3.ZERO)) {
      var n = t.geodeticSurfaceNormal(e, q);
      if (0 <= x.Cartesian3.dot(r, n)) return e;
    }
    var i = d.defined(this.rayEllipsoid(a, t)),
      s = t.transformPositionToScaledSpace(r, q),
      n = x.Cartesian3.normalize(s, s),
      a = x.Cartesian3.mostOrthogonalAxis(s, E),
      s = x.Cartesian3.normalize(x.Cartesian3.cross(a, n, L), L),
      a = x.Cartesian3.normalize(x.Cartesian3.cross(n, s, I), I),
      o = T;
    (o[0] = n.x),
      (o[1] = n.y),
      (o[2] = n.z),
      (o[3] = s.x),
      (o[4] = s.y),
      (o[5] = s.z),
      (o[6] = a.x),
      (o[7] = a.y),
      (o[8] = a.z);
    var n = y.Matrix3.transpose(o, U),
      u = y.Matrix3.fromScale(t.radii, W),
      s = y.Matrix3.fromScale(t.oneOverRadii, B),
      a = V;
    (a[0] = 0),
      (a[1] = -r.z),
      (a[2] = r.y),
      (a[3] = r.z),
      (a[4] = 0),
      (a[5] = -r.x),
      (a[6] = -r.y),
      (a[7] = r.x),
      (a[8] = 0);
    var c,
      s = y.Matrix3.multiply(y.Matrix3.multiply(n, s, Z), a, Z),
      a = y.Matrix3.multiply(y.Matrix3.multiply(s, u, A), o, A),
      s = y.Matrix3.multiplyByVector(s, e, z),
      C = (function (a, t, e, r, n) {
        var i,
          s = r * r,
          o = n * n,
          u = (a[y.Matrix3.COLUMN1ROW1] - a[y.Matrix3.COLUMN2ROW2]) * o,
          c =
            n *
            (r *
              N(
                a[y.Matrix3.COLUMN1ROW0],
                a[y.Matrix3.COLUMN0ROW1],
                O.CesiumMath.EPSILON15
              ) +
              t.y),
          C =
            a[y.Matrix3.COLUMN0ROW0] * s +
            a[y.Matrix3.COLUMN2ROW2] * o +
            r * t.x +
            e,
          l =
            o *
            N(
              a[y.Matrix3.COLUMN2ROW1],
              a[y.Matrix3.COLUMN1ROW2],
              O.CesiumMath.EPSILON15
            ),
          h =
            n *
            (r * N(a[y.Matrix3.COLUMN2ROW0], a[y.Matrix3.COLUMN0ROW2]) + t.z),
          M = [];
        if (0 == h && 0 == l) {
          if (0 === (i = P.computeRealRoots(u, c, C)).length) return M;
          var f = i[0],
            m = Math.sqrt(Math.max(1 - f * f, 0));
          return (
            M.push(new x.Cartesian3(r, n * f, n * -m)),
            M.push(new x.Cartesian3(r, n * f, n * m)),
            2 === i.length &&
              ((d = i[1]),
              (g = Math.sqrt(Math.max(1 - d * d, 0))),
              M.push(new x.Cartesian3(r, n * d, n * -g)),
              M.push(new x.Cartesian3(r, n * d, n * g))),
            M
          );
        }
        var d = u * u + (f = l * l),
          g = 2 * (c * u + (m = h * l)),
          f = 2 * C * u + c * c - f + (t = h * h),
          m = 2 * (C * c - m),
          t = C * C - t;
        if (0 == d && 0 == g && 0 == f && 0 == m) return M;
        var p = (i = b.computeRealRoots(d, g, f, m, t)).length;
        if (0 === p) return M;
        for (var v = 0; v < p; ++v) {
          var w = i[v],
            R = w * w,
            S = Math.max(1 - R, 0),
            S = Math.sqrt(S),
            R =
              O.CesiumMath.sign(u) === O.CesiumMath.sign(C)
                ? N(u * R + C, c * w, O.CesiumMath.EPSILON12)
                : O.CesiumMath.sign(C) === O.CesiumMath.sign(c * w)
                ? N(u * R, c * w + C, O.CesiumMath.EPSILON12)
                : N(u * R + c * w, C, O.CesiumMath.EPSILON12),
            R = R * N(l * w, h, O.CesiumMath.EPSILON15);
          R < 0
            ? M.push(new x.Cartesian3(r, n * w, n * S))
            : 0 < R
            ? M.push(new x.Cartesian3(r, n * w, n * -S))
            : 0 !== S
            ? (M.push(new x.Cartesian3(r, n * w, n * -S)),
              M.push(new x.Cartesian3(r, n * w, n * S)),
              ++v)
            : M.push(new x.Cartesian3(r, n * w, n * S));
        }
        return M;
      })(a, x.Cartesian3.negate(s, q), 0, 0, 1),
      l = C.length;
    if (0 < l) {
      for (
        var h = x.Cartesian3.clone(x.Cartesian3.ZERO, k),
          M = Number.NEGATIVE_INFINITY,
          f = 0;
        f < l;
        ++f
      ) {
        c = y.Matrix3.multiplyByVector(
          u,
          y.Matrix3.multiplyByVector(o, C[f], D),
          D
        );
        var m = x.Cartesian3.normalize(x.Cartesian3.subtract(c, e, E), E),
          m = x.Cartesian3.dot(m, r);
        M < m && ((M = m), (h = x.Cartesian3.clone(c, h)));
      }
      (a = t.cartesianToCartographic(h, F)),
        (M = O.CesiumMath.clamp(M, 0, 1)),
        (s =
          x.Cartesian3.magnitude(x.Cartesian3.subtract(h, e, E)) *
          Math.sqrt(1 - M * M));
      return (
        (s = i ? -s : s),
        (a.height = s),
        t.cartographicToCartesian(a, new x.Cartesian3())
      );
    }
  };
  var G = new x.Cartesian3();
  (C.lineSegmentPlane = function (a, t, e, r) {
    d.defined(r) || (r = new x.Cartesian3());
    var n = x.Cartesian3.subtract(t, a, G),
      i = e.normal,
      t = x.Cartesian3.dot(i, n);
    if (!(Math.abs(t) < O.CesiumMath.EPSILON6)) {
      (i = x.Cartesian3.dot(i, a)), (t = -(e.distance + i) / t);
      if (!(t < 0 || 1 < t))
        return (
          x.Cartesian3.multiplyByScalar(n, t, r), x.Cartesian3.add(a, r, r), r
        );
    }
  }),
    (C.trianglePlaneIntersection = function (a, t, e, r) {
      var n,
        i,
        s = r.normal,
        o = r.distance,
        u = x.Cartesian3.dot(s, a) + o < 0,
        c = x.Cartesian3.dot(s, t) + o < 0,
        s = x.Cartesian3.dot(s, e) + o < 0,
        o = 0;
      if (
        ((o += u ? 1 : 0),
        (o += c ? 1 : 0),
        (1 != (o += s ? 1 : 0) && 2 != o) ||
          ((n = new x.Cartesian3()), (i = new x.Cartesian3())),
        1 == o)
      ) {
        if (u)
          return (
            C.lineSegmentPlane(a, t, r, n),
            C.lineSegmentPlane(a, e, r, i),
            { positions: [a, t, e, n, i], indices: [0, 3, 4, 1, 2, 4, 1, 4, 3] }
          );
        if (c)
          return (
            C.lineSegmentPlane(t, e, r, n),
            C.lineSegmentPlane(t, a, r, i),
            { positions: [a, t, e, n, i], indices: [1, 3, 4, 2, 0, 4, 2, 4, 3] }
          );
        if (s)
          return (
            C.lineSegmentPlane(e, a, r, n),
            C.lineSegmentPlane(e, t, r, i),
            { positions: [a, t, e, n, i], indices: [2, 3, 4, 0, 1, 4, 0, 4, 3] }
          );
      } else if (2 == o) {
        if (!u)
          return (
            C.lineSegmentPlane(t, a, r, n),
            C.lineSegmentPlane(e, a, r, i),
            { positions: [a, t, e, n, i], indices: [1, 2, 4, 1, 4, 3, 0, 3, 4] }
          );
        if (!c)
          return (
            C.lineSegmentPlane(e, t, r, n),
            C.lineSegmentPlane(a, t, r, i),
            { positions: [a, t, e, n, i], indices: [2, 0, 4, 2, 4, 3, 1, 3, 4] }
          );
        if (!s)
          return (
            C.lineSegmentPlane(a, e, r, n),
            C.lineSegmentPlane(t, e, r, i),
            { positions: [a, t, e, n, i], indices: [0, 1, 4, 0, 4, 3, 2, 3, 4] }
          );
      }
    }),
    (a.IntersectionTests = C),
    (a.Ray = e);
});
