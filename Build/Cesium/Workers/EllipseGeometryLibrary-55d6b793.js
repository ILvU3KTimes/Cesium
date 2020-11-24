define([
  "exports",
  "./Math-fc8cecf5",
  "./Cartesian2-bddc1162",
  "./Transforms-d07bb42c",
], function (a, E, V, y) {
  "use strict";
  var e = {},
    u = new V.Cartesian3(),
    c = new V.Cartesian3(),
    m = new y.Quaternion(),
    h = new y.Matrix3();
  function A(a, e, r, t, i, n, s, o, l, C) {
    e = a + e;
    V.Cartesian3.multiplyByScalar(t, Math.cos(e), u),
      V.Cartesian3.multiplyByScalar(r, Math.sin(e), c),
      V.Cartesian3.add(u, c, u);
    e = Math.cos(a);
    e *= e;
    a = Math.sin(a);
    a *= a;
    a = n / Math.sqrt(s * e + i * a) / o;
    return (
      y.Quaternion.fromAxisAngle(u, a, m),
      y.Matrix3.fromQuaternion(m, h),
      y.Matrix3.multiplyByVector(h, l, C),
      V.Cartesian3.normalize(C, C),
      V.Cartesian3.multiplyByScalar(C, o, C),
      C
    );
  }
  var R = new V.Cartesian3(),
    W = new V.Cartesian3(),
    S = new V.Cartesian3(),
    M = new V.Cartesian3();
  e.raisePositionsToHeight = function (a, e, r) {
    for (
      var t = e.ellipsoid,
        i = e.height,
        n = e.extrudedHeight,
        e = r ? (a.length / 3) * 2 : a.length / 3,
        s = new Float64Array(3 * e),
        o = a.length,
        l = r ? o : 0,
        C = 0;
      C < o;
      C += 3
    ) {
      var y = C + 1,
        u = C + 2,
        c = V.Cartesian3.fromArray(a, C, R);
      t.scaleToGeodeticSurface(c, c);
      var m = V.Cartesian3.clone(c, W),
        h = t.geodeticSurfaceNormal(c, M),
        x = V.Cartesian3.multiplyByScalar(h, i, S);
      V.Cartesian3.add(c, x, c),
        r &&
          (V.Cartesian3.multiplyByScalar(h, n, x),
          V.Cartesian3.add(m, x, m),
          (s[C + l] = m.x),
          (s[y + l] = m.y),
          (s[u + l] = m.z)),
        (s[C] = c.x),
        (s[y] = c.y),
        (s[u] = c.z);
    }
    return s;
  };
  var B = new V.Cartesian3(),
    b = new V.Cartesian3(),
    Q = new V.Cartesian3();
  (e.computeEllipsePositions = function (a, e, r) {
    var t = a.semiMinorAxis,
      i = a.semiMajorAxis,
      n = a.rotation,
      s = a.center,
      a = 8 * a.granularity,
      o = t * t,
      l = i * i,
      C = i * t,
      y = V.Cartesian3.magnitude(s),
      u = V.Cartesian3.normalize(s, B),
      c = V.Cartesian3.cross(V.Cartesian3.UNIT_Z, s, b),
      c = V.Cartesian3.normalize(c, c),
      m = V.Cartesian3.cross(u, c, Q),
      h = 1 + Math.ceil(E.CesiumMath.PI_OVER_TWO / a),
      x = E.CesiumMath.PI_OVER_TWO / (h - 1),
      M = E.CesiumMath.PI_OVER_TWO - h * x;
    M < 0 && (h -= Math.ceil(Math.abs(M) / x));
    var f,
      z,
      d,
      _,
      O,
      p = e ? new Array(3 * (h * (h + 2) * 2)) : void 0,
      w = 0,
      P = R,
      T = W,
      a = 4 * h * 3,
      I = a - 1,
      g = 0,
      v = r ? new Array(a) : void 0,
      P = A((M = E.CesiumMath.PI_OVER_TWO), n, m, c, o, C, l, y, u, P);
    for (
      e && ((p[w++] = P.x), (p[w++] = P.y), (p[w++] = P.z)),
        r && ((v[I--] = P.z), (v[I--] = P.y), (v[I--] = P.x)),
        M = E.CesiumMath.PI_OVER_TWO - x,
        f = 1;
      f < h + 1;
      ++f
    ) {
      if (
        ((P = A(M, n, m, c, o, C, l, y, u, P)),
        (T = A(Math.PI - M, n, m, c, o, C, l, y, u, T)),
        e)
      ) {
        for (
          p[w++] = P.x, p[w++] = P.y, p[w++] = P.z, d = 2 * f + 2, z = 1;
          z < d - 1;
          ++z
        )
          (_ = z / (d - 1)),
            (O = V.Cartesian3.lerp(P, T, _, S)),
            (p[w++] = O.x),
            (p[w++] = O.y),
            (p[w++] = O.z);
        (p[w++] = T.x), (p[w++] = T.y), (p[w++] = T.z);
      }
      r &&
        ((v[I--] = P.z),
        (v[I--] = P.y),
        (v[I--] = P.x),
        (v[g++] = T.x),
        (v[g++] = T.y),
        (v[g++] = T.z)),
        (M = E.CesiumMath.PI_OVER_TWO - (f + 1) * x);
    }
    for (f = h; 1 < f; --f) {
      if (
        ((P = A(
          -(M = E.CesiumMath.PI_OVER_TWO - (f - 1) * x),
          n,
          m,
          c,
          o,
          C,
          l,
          y,
          u,
          P
        )),
        (T = A(M + Math.PI, n, m, c, o, C, l, y, u, T)),
        e)
      ) {
        for (
          p[w++] = P.x, p[w++] = P.y, p[w++] = P.z, d = 2 * (f - 1) + 2, z = 1;
          z < d - 1;
          ++z
        )
          (_ = z / (d - 1)),
            (O = V.Cartesian3.lerp(P, T, _, S)),
            (p[w++] = O.x),
            (p[w++] = O.y),
            (p[w++] = O.z);
        (p[w++] = T.x), (p[w++] = T.y), (p[w++] = T.z);
      }
      r &&
        ((v[I--] = P.z),
        (v[I--] = P.y),
        (v[I--] = P.x),
        (v[g++] = T.x),
        (v[g++] = T.y),
        (v[g++] = T.z));
    }
    P = A(-(M = E.CesiumMath.PI_OVER_TWO), n, m, c, o, C, l, y, u, P);
    a = {};
    return (
      e &&
        ((p[w++] = P.x),
        (p[w++] = P.y),
        (p[w++] = P.z),
        (a.positions = p),
        (a.numPts = h)),
      r &&
        ((v[I--] = P.z),
        (v[I--] = P.y),
        (v[I--] = P.x),
        (a.outerPositions = v)),
      a
    );
  }),
    (a.EllipseGeometryLibrary = e);
});
