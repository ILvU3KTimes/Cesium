define([
  "./when-54c2dc71",
  "./Check-6c0211bc",
  "./Math-fc8cecf5",
  "./Cartesian2-bddc1162",
  "./Transforms-d07bb42c",
  "./RuntimeError-2109023a",
  "./WebGLConstants-76bb35d1",
  "./ComponentDatatype-6d99a1ee",
  "./AttributeCompression-9fc99391",
  "./IndexDatatype-53503fee",
  "./IntersectionTests-8abf6dba",
  "./Plane-c8971487",
  "./WebMercatorProjection-df58d479",
  "./createTaskProcessorWorker",
  "./EllipsoidTangentPlane-64140317",
  "./OrientedBoundingBox-11af7c9d",
  "./TerrainEncoding-d6aef4ae",
], function (ie, e, oe, ae, se, t, r, n, de, ce, i, o, ue, a, he, le, Ie) {
  "use strict";
  function me() {
    e.DeveloperError.throwInstantiationError();
  }
  Object.defineProperties(me.prototype, {
    errorEvent: { get: e.DeveloperError.throwInstantiationError },
    credit: { get: e.DeveloperError.throwInstantiationError },
    tilingScheme: { get: e.DeveloperError.throwInstantiationError },
    ready: { get: e.DeveloperError.throwInstantiationError },
    readyPromise: { get: e.DeveloperError.throwInstantiationError },
    hasWaterMask: { get: e.DeveloperError.throwInstantiationError },
    hasVertexNormals: { get: e.DeveloperError.throwInstantiationError },
    availability: { get: e.DeveloperError.throwInstantiationError },
  });
  var s = [];
  me.getRegularGridIndices = function (e, t) {
    var r = s[e];
    ie.defined(r) || (s[e] = r = []);
    var n = r[t];
    return (
      ie.defined(n) ||
        m(
          e,
          t,
          (n =
            e * t < oe.CesiumMath.SIXTY_FOUR_KILOBYTES
              ? (r[t] = new Uint16Array((e - 1) * (t - 1) * 6))
              : (r[t] = new Uint32Array((e - 1) * (t - 1) * 6))),
          0
        ),
      n
    );
  };
  var d = [];
  me.getRegularGridIndicesAndEdgeIndices = function (e, t) {
    var r = d[e];
    ie.defined(r) || (d[e] = r = []);
    var n,
      i,
      o,
      a,
      s = r[t];
    return (
      ie.defined(s) ||
        ((n = me.getRegularGridIndices(e, t)),
        (i = (a = I(e, t)).westIndicesSouthToNorth),
        (o = a.southIndicesEastToWest),
        (e = a.eastIndicesNorthToSouth),
        (a = a.northIndicesWestToEast),
        (s = r[t] = {
          indices: n,
          westIndicesSouthToNorth: i,
          southIndicesEastToWest: o,
          eastIndicesNorthToSouth: e,
          northIndicesWestToEast: a,
        })),
      s
    );
  };
  var l = [];
  function I(e, t) {
    for (
      var r = new Array(t),
        n = new Array(e),
        i = new Array(t),
        o = new Array(e),
        a = 0;
      a < e;
      ++a
    )
      n[(o[a] = a)] = e * t - 1 - a;
    for (a = 0; a < t; ++a) (i[a] = (a + 1) * e - 1), (r[a] = (t - a - 1) * e);
    return {
      westIndicesSouthToNorth: r,
      southIndicesEastToWest: n,
      eastIndicesNorthToSouth: i,
      northIndicesWestToEast: o,
    };
  }
  function m(e, t, r, n) {
    for (var i = 0, o = 0; o < t - 1; ++o) {
      for (var a = 0; a < e - 1; ++a) {
        var s = i + e,
          d = s + 1,
          c = i + 1;
        (r[n++] = i),
          (r[n++] = s),
          (r[n++] = c),
          (r[n++] = c),
          (r[n++] = s),
          (r[n++] = d),
          ++i;
      }
      ++i;
    }
  }
  function c(e, t, r, n) {
    for (var i = e[0], o = e.length, a = 1; a < o; ++a) {
      var s = e[a];
      (r[n++] = i),
        (r[n++] = s),
        (r[n++] = t),
        (r[n++] = t),
        (r[n++] = s),
        (r[n++] = t + 1),
        (i = s),
        ++t;
    }
    return n;
  }
  (me.getRegularGridAndSkirtIndicesAndEdgeIndices = function (e, t) {
    var r = l[e];
    ie.defined(r) || (l[e] = r = []);
    var n,
      i,
      o,
      a,
      s,
      d,
      c,
      u,
      h = r[t];
    return (
      ie.defined(h) ||
        ((o = (n = e * t) + (d = 2 * e + 2 * t)),
        (u = (i = (e - 1) * (t - 1) * 6) + 6 * Math.max(0, d - 4)),
        (a = (c = I(e, t)).westIndicesSouthToNorth),
        (s = c.southIndicesEastToWest),
        (d = c.eastIndicesNorthToSouth),
        (c = c.northIndicesWestToEast),
        m(e, t, (u = ce.IndexDatatype.createTypedArray(o, u)), 0),
        me.addSkirtIndices(a, s, d, c, n, u, i),
        (h = r[t] = {
          indices: u,
          westIndicesSouthToNorth: a,
          southIndicesEastToWest: s,
          eastIndicesNorthToSouth: d,
          northIndicesWestToEast: c,
          indexCountWithoutSkirts: i,
        })),
      h
    );
  }),
    (me.addSkirtIndices = function (e, t, r, n, i, o, a) {
      (a = c(e, i, o, a)),
        (a = c(t, (i += e.length), o, a)),
        (a = c(r, (i += t.length), o, a)),
        c(n, (i += r.length), o, a);
    }),
    (me.heightmapTerrainQuality = 0.25),
    (me.getEstimatedLevelZeroGeometricErrorForAHeightmap = function (e, t, r) {
      return (
        (2 * e.maximumRadius * Math.PI * me.heightmapTerrainQuality) / (t * r)
      );
    }),
    (me.prototype.requestTileGeometry =
      e.DeveloperError.throwInstantiationError),
    (me.prototype.getLevelMaximumGeometricError =
      e.DeveloperError.throwInstantiationError),
    (me.prototype.getTileDataAvailable =
      e.DeveloperError.throwInstantiationError),
    (me.prototype.loadTileDataAvailability =
      e.DeveloperError.throwInstantiationError);
  var ge = 32767,
    Te = new ae.Cartesian3(),
    pe = new ae.Cartesian3(),
    Ee = new ae.Cartesian3(),
    fe = new ae.Cartographic(),
    ye = new ae.Cartesian2(),
    ve = new ae.Cartesian3(),
    Ne = new se.Matrix4(),
    we = new se.Matrix4();
  function xe(e, t, r, n, i, o, a, s, d) {
    var c = Number.POSITIVE_INFINITY,
      u = i.north,
      h = i.south,
      l = i.east,
      I = i.west;
    l < I && (l += oe.CesiumMath.TWO_PI);
    for (var m = e.length, g = 0; g < m; ++g) {
      var T = e[g],
        p = r[T],
        T = n[T];
      (fe.longitude = oe.CesiumMath.lerp(I, l, T.x)),
        (fe.latitude = oe.CesiumMath.lerp(h, u, T.y)),
        (fe.height = p - t);
      p = o.cartographicToCartesian(fe, Te);
      se.Matrix4.multiplyByPoint(a, p, p),
        ae.Cartesian3.minimumByComponent(p, s, s),
        ae.Cartesian3.maximumByComponent(p, d, d),
        (c = Math.min(c, fe.height));
    }
    return c;
  }
  function Me(e, t, r, n, i, o, a, s, d, c, u, h, l, I, m) {
    var g = ie.defined(a),
      T = d.north,
      p = d.south,
      E = d.east,
      f = d.west;
    E < f && (E += oe.CesiumMath.TWO_PI);
    for (var y = r.length, v = 0; v < y; ++v) {
      var N = r[v],
        w = i[N],
        x = o[N];
      (fe.longitude = oe.CesiumMath.lerp(f, E, x.x) + I),
        (fe.latitude = oe.CesiumMath.lerp(p, T, x.y) + m),
        (fe.height = w - c);
      var M,
        b,
        C = s.cartographicToCartesian(fe, Te);
      g &&
        ((M = 2 * N),
        (ye.x = a[M]),
        (ye.y = a[1 + M]),
        1 !== u &&
          ((w = de.AttributeCompression.octDecode(ye.x, ye.y, ve)),
          (N = se.Transforms.eastNorthUpToFixedFrame(Te, s, we)),
          (M = se.Matrix4.inverseTransformation(N, Ne)),
          se.Matrix4.multiplyByPointAsVector(M, w, w),
          (w.z *= u),
          ae.Cartesian3.normalize(w, w),
          se.Matrix4.multiplyByPointAsVector(N, w, w),
          ae.Cartesian3.normalize(w, w),
          de.AttributeCompression.octEncode(w, ye))),
        n.hasWebMercatorT &&
          (b =
            (ue.WebMercatorProjection.geodeticLatitudeToMercatorAngle(
              fe.latitude
            ) -
              h) *
            l),
        (t = n.encode(e, t, C, x, fe.height, ye, b));
    }
  }
  function be(e, t) {
    var r;
    return (
      "function" == typeof e.slice &&
        "function" != typeof (r = e.slice()).sort &&
        (r = void 0),
      ie.defined(r) || (r = Array.prototype.slice.call(e)),
      r.sort(t),
      r
    );
  }
  return a(function (e, t) {
    var r,
      n,
      i = (ne = e.quantizedVertices).length / 3,
      o = e.octEncodedNormals,
      a =
        e.westIndices.length +
        e.eastIndices.length +
        e.southIndices.length +
        e.northIndices.length,
      s = e.includeWebMercatorT,
      d = ae.Rectangle.clone(e.rectangle),
      c = d.west,
      u = d.south,
      h = d.east,
      l = d.north,
      I = ae.Ellipsoid.clone(e.ellipsoid),
      m = e.exaggeration,
      g = e.minimumHeight * m,
      T = e.maximumHeight * m,
      p = e.relativeToCenter,
      E = se.Transforms.eastNorthUpToFixedFrame(p, I),
      f = se.Matrix4.inverseTransformation(E, new se.Matrix4());
    s &&
      ((r = ue.WebMercatorProjection.geodeticLatitudeToMercatorAngle(u)),
      (n =
        1 / (ue.WebMercatorProjection.geodeticLatitudeToMercatorAngle(l) - r)));
    var y = ne.subarray(0, i),
      v = ne.subarray(i, 2 * i),
      N = ne.subarray(2 * i, 3 * i),
      w = ie.defined(o),
      x = new Array(i),
      M = new Array(i),
      b = new Array(i),
      C = s ? new Array(i) : [],
      S = pe;
    (S.x = Number.POSITIVE_INFINITY),
      (S.y = Number.POSITIVE_INFINITY),
      (S.z = Number.POSITIVE_INFINITY);
    var A = Ee;
    (A.x = Number.NEGATIVE_INFINITY),
      (A.y = Number.NEGATIVE_INFINITY),
      (A.z = Number.NEGATIVE_INFINITY);
    for (
      var P = Number.POSITIVE_INFINITY,
        W = Number.NEGATIVE_INFINITY,
        D = Number.POSITIVE_INFINITY,
        B = Number.NEGATIVE_INFINITY,
        F = 0;
      F < i;
      ++F
    ) {
      var k = y[F],
        V = v[F],
        _ = k / ge,
        H = V / ge,
        k = oe.CesiumMath.lerp(g, T, N[F] / ge);
      (fe.longitude = oe.CesiumMath.lerp(c, h, _)),
        (fe.latitude = oe.CesiumMath.lerp(u, l, H)),
        (fe.height = k),
        (P = Math.min(fe.longitude, P)),
        (W = Math.max(fe.longitude, W)),
        (D = Math.min(fe.latitude, D)),
        (B = Math.max(fe.latitude, B));
      V = I.cartographicToCartesian(fe);
      (x[F] = new ae.Cartesian2(_, H)),
        (M[F] = k),
        (b[F] = V),
        s &&
          (C[F] =
            (ue.WebMercatorProjection.geodeticLatitudeToMercatorAngle(
              fe.latitude
            ) -
              r) *
            n),
        se.Matrix4.multiplyByPoint(f, V, Te),
        ae.Cartesian3.minimumByComponent(Te, S, S),
        ae.Cartesian3.maximumByComponent(Te, A, A);
    }
    var O,
      G,
      Y,
      z = be(e.westIndices, function (e, t) {
        return x[e].y - x[t].y;
      }),
      R = be(e.eastIndices, function (e, t) {
        return x[t].y - x[e].y;
      }),
      L = be(e.southIndices, function (e, t) {
        return x[t].x - x[e].x;
      }),
      U = be(e.northIndices, function (e, t) {
        return x[e].x - x[t].x;
      });
    1 !== m &&
      ((G = se.BoundingSphere.fromPoints(b)),
      (O = le.OrientedBoundingBox.fromRectangle(d, g, T, I))),
      (1 !== m || g < 0) &&
        (Y = new Ie.EllipsoidalOccluder(
          I
        ).computeHorizonCullingPointPossiblyUnderEllipsoid(p, b, g));
    var j = g,
      j = Math.min(
        j,
        xe(e.westIndices, e.westSkirtHeight, M, x, d, I, f, S, A)
      );
    (j = Math.min(
      j,
      xe(e.southIndices, e.southSkirtHeight, M, x, d, I, f, S, A)
    )),
      (j = Math.min(
        j,
        xe(e.eastIndices, e.eastSkirtHeight, M, x, d, I, f, S, A)
      )),
      (j = Math.min(
        j,
        xe(e.northIndices, e.northSkirtHeight, M, x, d, I, f, S, A)
      ));
    for (
      var q,
        Q,
        K,
        X = new he.AxisAlignedBoundingBox(S, A, p),
        Z = new Ie.TerrainEncoding(X, j, T, E, w, s),
        J = Z.getStride(),
        $ = new Float32Array(i * J + a * J),
        ee = 0,
        te = 0;
      te < i;
      ++te
    )
      w &&
        ((K = 2 * te),
        (ye.x = o[K]),
        (ye.y = o[1 + K]),
        1 !== m &&
          ((q = de.AttributeCompression.octDecode(ye.x, ye.y, ve)),
          (Q = se.Transforms.eastNorthUpToFixedFrame(b[te], I, we)),
          (K = se.Matrix4.inverseTransformation(Q, Ne)),
          se.Matrix4.multiplyByPointAsVector(K, q, q),
          (q.z *= m),
          ae.Cartesian3.normalize(q, q),
          se.Matrix4.multiplyByPointAsVector(Q, q, q),
          ae.Cartesian3.normalize(q, q),
          de.AttributeCompression.octEncode(q, ye))),
        (ee = Z.encode($, ee, b[te], x[te], M[te], ye, C[te]));
    var re = Math.max(0, 2 * (a - 4)),
      ne = e.indices.length + 3 * re;
    return (
      (X = ce.IndexDatatype.createTypedArray(i + a, ne)).set(e.indices, 0),
      (re = -(j = 1e-4 * (W - P))),
      (a = j),
      (j = -(ne = E = 1e-4 * (B - D))),
      Me(
        $,
        (E = i * J),
        z,
        Z,
        M,
        x,
        o,
        I,
        d,
        e.westSkirtHeight,
        m,
        r,
        n,
        re,
        0
      ),
      Me(
        $,
        (E += e.westIndices.length * J),
        L,
        Z,
        M,
        x,
        o,
        I,
        d,
        e.southSkirtHeight,
        m,
        r,
        n,
        0,
        j
      ),
      Me(
        $,
        (E += e.southIndices.length * J),
        R,
        Z,
        M,
        x,
        o,
        I,
        d,
        e.eastSkirtHeight,
        m,
        r,
        n,
        a,
        0
      ),
      Me(
        $,
        (E += e.eastIndices.length * J),
        U,
        Z,
        M,
        x,
        o,
        I,
        d,
        e.northSkirtHeight,
        m,
        r,
        n,
        0,
        ne
      ),
      me.addSkirtIndices(z, L, R, U, i, X, e.indices.length),
      t.push($.buffer, X.buffer),
      {
        vertices: $.buffer,
        indices: X.buffer,
        westIndicesSouthToNorth: z,
        southIndicesEastToWest: L,
        eastIndicesNorthToSouth: R,
        northIndicesWestToEast: U,
        vertexStride: J,
        center: p,
        minimumHeight: g,
        maximumHeight: T,
        boundingSphere: G,
        orientedBoundingBox: O,
        occludeePointInScaledSpace: Y,
        encoding: Z,
        indexCountWithoutSkirts: e.indices.length,
      }
    );
  });
});
