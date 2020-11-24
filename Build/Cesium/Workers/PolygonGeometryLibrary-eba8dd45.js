define([
  "exports",
  "./when-54c2dc71",
  "./Math-fc8cecf5",
  "./Cartesian2-bddc1162",
  "./Transforms-d07bb42c",
  "./ComponentDatatype-6d99a1ee",
  "./GeometryAttribute-be1a3386",
  "./GeometryAttributes-4fcfcf40",
  "./GeometryPipeline-c2d75081",
  "./IndexDatatype-53503fee",
  "./arrayRemoveDuplicates-ebc732b0",
  "./ArcType-dc1c5aee",
  "./EllipsoidRhumbLine-c704bf4c",
  "./PolygonPipeline-b9585f01",
], function (e, I, x, E, p, A, P, _, d, G, L, M, f, D) {
  "use strict";
  function S() {
    (this._array = []), (this._offset = 0), (this._length = 0);
  }
  Object.defineProperties(S.prototype, {
    length: {
      get: function () {
        return this._length;
      },
    },
  }),
    (S.prototype.enqueue = function (e) {
      this._array.push(e), this._length++;
    }),
    (S.prototype.dequeue = function () {
      if (0 !== this._length) {
        var e = this._array,
          t = this._offset,
          r = e[t];
        return (
          (e[t] = void 0),
          10 < ++t && 2 * t > e.length && ((this._array = e.slice(t)), (t = 0)),
          (this._offset = t),
          this._length--,
          r
        );
      }
    }),
    (S.prototype.peek = function () {
      if (0 !== this._length) return this._array[this._offset];
    }),
    (S.prototype.contains = function (e) {
      return -1 !== this._array.indexOf(e);
    }),
    (S.prototype.clear = function () {
      this._array.length = this._offset = this._length = 0;
    }),
    (S.prototype.sort = function (e) {
      0 < this._offset &&
        ((this._array = this._array.slice(this._offset)), (this._offset = 0)),
        this._array.sort(e);
    });
  var R = {
      computeHierarchyPackedLength: function (e) {
        for (var t = 0, r = [e]; 0 < r.length; ) {
          var i = r.pop();
          if (I.defined(i)) {
            t += 2;
            var n = i.positions,
              a = i.holes;
            if (
              (I.defined(n) && (t += n.length * E.Cartesian3.packedLength),
              I.defined(a))
            )
              for (var o = a.length, s = 0; s < o; ++s) r.push(a[s]);
          }
        }
        return t;
      },
      packPolygonHierarchy: function (e, t, r) {
        for (var i = [e]; 0 < i.length; ) {
          var n = i.pop();
          if (I.defined(n)) {
            var a = n.positions,
              o = n.holes;
            if (
              ((t[r++] = I.defined(a) ? a.length : 0),
              (t[r++] = I.defined(o) ? o.length : 0),
              I.defined(a))
            )
              for (var s = a.length, u = 0; u < s; ++u, r += 3)
                E.Cartesian3.pack(a[u], t, r);
            if (I.defined(o))
              for (var l = o.length, c = 0; c < l; ++c) i.push(o[c]);
          }
        }
        return r;
      },
      unpackPolygonHierarchy: function (e, t) {
        for (
          var r = e[t++],
            i = e[t++],
            n = new Array(r),
            a = 0 < i ? new Array(i) : void 0,
            o = 0;
          o < r;
          ++o, t += E.Cartesian3.packedLength
        )
          n[o] = E.Cartesian3.unpack(e, t);
        for (var s = 0; s < i; ++s)
          (a[s] = R.unpackPolygonHierarchy(e, t)),
            (t = a[s].startingIndex),
            delete a[s].startingIndex;
        return { positions: n, holes: a, startingIndex: t };
      },
    },
    y = new E.Cartesian3();
  R.subdivideLineCount = function (e, t, r) {
    (r = E.Cartesian3.distance(e, t) / r),
      (r = Math.max(0, Math.ceil(x.CesiumMath.log2(r))));
    return Math.pow(2, r);
  };
  var g = new E.Cartographic(),
    v = new E.Cartographic(),
    m = new E.Cartographic(),
    C = new E.Cartesian3();
  (R.subdivideRhumbLineCount = function (e, t, r, i) {
    (t = e.cartesianToCartographic(t, g)),
      (r = e.cartesianToCartographic(r, v)),
      (i = new f.EllipsoidRhumbLine(t, r, e).surfaceDistance / i),
      (i = Math.max(0, Math.ceil(x.CesiumMath.log2(i))));
    return Math.pow(2, i);
  }),
    (R.subdivideLine = function (e, t, r, i) {
      var n = R.subdivideLineCount(e, t, r),
        a = E.Cartesian3.distance(e, t),
        o = a / n;
      I.defined(i) || (i = []);
      var s = i;
      s.length = 3 * n;
      for (var u, l, c, h = 0, f = 0; f < n; f++) {
        var p =
          ((p = e),
          (u = t),
          (l = f * o),
          (c = a),
          E.Cartesian3.subtract(u, p, y),
          E.Cartesian3.multiplyByScalar(y, l / c, y),
          E.Cartesian3.add(p, y, y),
          [y.x, y.y, y.z]);
        (s[h++] = p[0]), (s[h++] = p[1]), (s[h++] = p[2]);
      }
      return s;
    }),
    (R.subdivideRhumbLine = function (e, t, r, i, n) {
      var t = e.cartesianToCartographic(t, g),
        r = e.cartesianToCartographic(r, v),
        a = new f.EllipsoidRhumbLine(t, r, e),
        i = a.surfaceDistance / i,
        i = Math.max(0, Math.ceil(x.CesiumMath.log2(i))),
        o = Math.pow(2, i),
        s = a.surfaceDistance / o;
      I.defined(n) || (n = []);
      var u = n;
      u.length = 3 * o;
      for (var l = 0, c = 0; c < o; c++) {
        var h = a.interpolateUsingSurfaceDistance(c * s, m),
          h = e.cartographicToCartesian(h, C);
        (u[l++] = h.x), (u[l++] = h.y), (u[l++] = h.z);
      }
      return u;
    });
  var b = new E.Cartesian3(),
    w = new E.Cartesian3(),
    T = new E.Cartesian3(),
    N = new E.Cartesian3();
  (R.scaleToGeodeticHeightExtruded = function (e, t, r, i, n) {
    i = I.defaultValue(i, E.Ellipsoid.WGS84);
    var a = b,
      o = w,
      s = T,
      u = N;
    if (
      I.defined(e) &&
      I.defined(e.attributes) &&
      I.defined(e.attributes.position)
    )
      for (
        var l = e.attributes.position.values, c = l.length / 2, h = 0;
        h < c;
        h += 3
      )
        E.Cartesian3.fromArray(l, h, s),
          i.geodeticSurfaceNormal(s, a),
          (u = i.scaleToGeodeticSurface(s, u)),
          (o = E.Cartesian3.multiplyByScalar(a, r, o)),
          (o = E.Cartesian3.add(u, o, o)),
          (l[h + c] = o.x),
          (l[h + 1 + c] = o.y),
          (l[h + 2 + c] = o.z),
          n && (u = E.Cartesian3.clone(s, u)),
          (o = E.Cartesian3.multiplyByScalar(a, t, o)),
          (o = E.Cartesian3.add(u, o, o)),
          (l[h] = o.x),
          (l[h + 1] = o.y),
          (l[h + 2] = o.z);
    return e;
  }),
    (R.polygonOutlinesFromHierarchy = function (e, t, r) {
      var i,
        n,
        a = [],
        o = new S();
      for (o.enqueue(e); 0 !== o.length; ) {
        var s = o.dequeue(),
          u = s.positions;
        if (t)
          for (n = u.length, c = 0; c < n; c++)
            r.scaleToGeodeticSurface(u[c], u[c]);
        if (
          !(
            (u = L.arrayRemoveDuplicates(u, E.Cartesian3.equalsEpsilon, !0))
              .length < 3
          )
        ) {
          for (var l = s.holes ? s.holes.length : 0, c = 0; c < l; c++) {
            var h = s.holes[c],
              f = h.positions;
            if (t)
              for (n = f.length, i = 0; i < n; ++i)
                r.scaleToGeodeticSurface(f[i], f[i]);
            if (
              !(
                (f = L.arrayRemoveDuplicates(f, E.Cartesian3.equalsEpsilon, !0))
                  .length < 3
              )
            ) {
              a.push(f);
              var p = 0;
              for (
                I.defined(h.holes) && (p = h.holes.length), i = 0;
                i < p;
                i++
              )
                o.enqueue(h.holes[i]);
            }
          }
          a.push(u);
        }
      }
      return a;
    }),
    (R.polygonsFromHierarchy = function (e, t, r, i) {
      var n = [],
        a = [],
        o = new S();
      for (o.enqueue(e); 0 !== o.length; ) {
        var s,
          u = o.dequeue(),
          l = u.positions,
          c = u.holes;
        if (r)
          for (s = l.length, m = 0; m < s; m++)
            i.scaleToGeodeticSurface(l[m], l[m]);
        if (
          !(
            (l = L.arrayRemoveDuplicates(l, E.Cartesian3.equalsEpsilon, !0))
              .length < 3
          )
        ) {
          var h = t(l);
          if (I.defined(h)) {
            var f = [],
              p = D.PolygonPipeline.computeWindingOrder2D(h);
            p === D.WindingOrder.CLOCKWISE &&
              (h.reverse(), (l = l.slice().reverse()));
            for (
              var d,
                y = l.slice(),
                g = I.defined(c) ? c.length : 0,
                v = [],
                m = 0;
              m < g;
              m++
            ) {
              var C = c[m],
                b = C.positions;
              if (r)
                for (s = b.length, d = 0; d < s; ++d)
                  i.scaleToGeodeticSurface(b[d], b[d]);
              if (
                !(
                  (b = L.arrayRemoveDuplicates(
                    b,
                    E.Cartesian3.equalsEpsilon,
                    !0
                  )).length < 3
                )
              ) {
                var w = t(b);
                if (I.defined(w)) {
                  D.PolygonPipeline.computeWindingOrder2D(w) ===
                    D.WindingOrder.CLOCKWISE &&
                    (w.reverse(), (b = b.slice().reverse())),
                    v.push(b),
                    f.push(y.length),
                    (y = y.concat(b)),
                    (h = h.concat(w));
                  var T = 0;
                  for (
                    I.defined(C.holes) && (T = C.holes.length), d = 0;
                    d < T;
                    d++
                  )
                    o.enqueue(C.holes[d]);
                }
              }
            }
            n.push({ outerRing: l, holes: v }),
              a.push({ positions: y, positions2D: h, holes: f });
          }
        }
      }
      return { hierarchy: n, polygons: a };
    });
  var O = new E.Cartesian2(),
    q = new E.Cartesian3(),
    B = new p.Quaternion(),
    H = new p.Matrix3();
  (R.computeBoundingRectangle = function (e, t, r, i, n) {
    for (
      var i = p.Quaternion.fromAxisAngle(e, i, B),
        a = p.Matrix3.fromQuaternion(i, H),
        o = Number.POSITIVE_INFINITY,
        s = Number.NEGATIVE_INFINITY,
        u = Number.POSITIVE_INFINITY,
        l = Number.NEGATIVE_INFINITY,
        c = r.length,
        h = 0;
      h < c;
      ++h
    ) {
      var f = E.Cartesian3.clone(r[h], q);
      p.Matrix3.multiplyByVector(a, f, f);
      f = t(f, O);
      I.defined(f) &&
        ((o = Math.min(o, f.x)),
        (s = Math.max(s, f.x)),
        (u = Math.min(u, f.y)),
        (l = Math.max(l, f.y)));
    }
    return (n.x = o), (n.y = u), (n.width = s - o), (n.height = l - u), n;
  }),
    (R.createGeometryFromPositions = function (e, t, r, i, n, a) {
      var o = D.PolygonPipeline.triangulate(t.positions2D, t.holes);
      o.length < 3 && (o = [0, 1, 2]);
      var s = t.positions;
      if (i) {
        for (var u = s.length, l = new Array(3 * u), c = 0, h = 0; h < u; h++) {
          var f = s[h];
          (l[c++] = f.x), (l[c++] = f.y), (l[c++] = f.z);
        }
        i = new P.Geometry({
          attributes: {
            position: new P.GeometryAttribute({
              componentDatatype: A.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: l,
            }),
          },
          indices: o,
          primitiveType: P.PrimitiveType.TRIANGLES,
        });
        return n.normal ? d.GeometryPipeline.computeNormal(i) : i;
      }
      return a === M.ArcType.GEODESIC
        ? D.PolygonPipeline.computeSubdivision(e, s, o, r)
        : a === M.ArcType.RHUMB
        ? D.PolygonPipeline.computeRhumbLineSubdivision(e, s, o, r)
        : void 0;
    });
  var k = [],
    z = new E.Cartesian3(),
    W = new E.Cartesian3();
  (R.computeWallGeometry = function (e, t, r, i, n) {
    var a,
      o,
      s,
      u = e.length,
      l = 0;
    if (i)
      for (o = 3 * u * 2, a = new Array(2 * o), s = 0; s < u; s++)
        (p = e[s]),
          (d = e[(s + 1) % u]),
          (a[l] = a[l + o] = p.x),
          (a[++l] = a[l + o] = p.y),
          (a[++l] = a[l + o] = p.z),
          (a[++l] = a[l + o] = d.x),
          (a[++l] = a[l + o] = d.y),
          (a[++l] = a[l + o] = d.z),
          ++l;
    else {
      var c = x.CesiumMath.chordLength(r, t.maximumRadius),
        h = 0;
      if (n === M.ArcType.GEODESIC)
        for (s = 0; s < u; s++)
          h += R.subdivideLineCount(e[s], e[(s + 1) % u], c);
      else if (n === M.ArcType.RHUMB)
        for (s = 0; s < u; s++)
          h += R.subdivideRhumbLineCount(t, e[s], e[(s + 1) % u], c);
      for (o = 3 * (h + u), a = new Array(2 * o), s = 0; s < u; s++) {
        var f,
          p = e[s],
          d = e[(s + 1) % u];
        n === M.ArcType.GEODESIC
          ? (f = R.subdivideLine(p, d, c, k))
          : n === M.ArcType.RHUMB && (f = R.subdivideRhumbLine(t, p, d, c, k));
        for (var y = f.length, g = 0; g < y; ++g, ++l)
          (a[l] = f[g]), (a[l + o] = f[g]);
        (a[l] = d.x),
          (a[l + o] = d.x),
          (a[++l] = d.y),
          (a[l + o] = d.y),
          (a[++l] = d.z),
          (a[l + o] = d.z),
          ++l;
      }
    }
    u = a.length;
    var v = G.IndexDatatype.createTypedArray(u / 3, u - 6 * e.length),
      m = 0;
    for (u /= 6, s = 0; s < u; s++) {
      var C = s,
        b = C + 1,
        w = C + u,
        T = w + 1;
      (p = E.Cartesian3.fromArray(a, 3 * C, z)),
        (d = E.Cartesian3.fromArray(a, 3 * b, W)),
        E.Cartesian3.equalsEpsilon(
          p,
          d,
          x.CesiumMath.EPSILON10,
          x.CesiumMath.EPSILON10
        ) ||
          ((v[m++] = C),
          (v[m++] = w),
          (v[m++] = b),
          (v[m++] = b),
          (v[m++] = w),
          (v[m++] = T));
    }
    return new P.Geometry({
      attributes: new _.GeometryAttributes({
        position: new P.GeometryAttribute({
          componentDatatype: A.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: a,
        }),
      }),
      indices: v,
      primitiveType: P.PrimitiveType.TRIANGLES,
    });
  }),
    (e.PolygonGeometryLibrary = R);
});
