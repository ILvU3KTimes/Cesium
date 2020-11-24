define([
  "./when-54c2dc71",
  "./Check-6c0211bc",
  "./Math-fc8cecf5",
  "./Cartesian2-bddc1162",
  "./Transforms-d07bb42c",
  "./RuntimeError-2109023a",
  "./WebGLConstants-76bb35d1",
  "./ComponentDatatype-6d99a1ee",
  "./GeometryAttribute-be1a3386",
  "./GeometryAttributes-4fcfcf40",
  "./AttributeCompression-9fc99391",
  "./GeometryPipeline-c2d75081",
  "./EncodedCartesian3-4df2eabb",
  "./IndexDatatype-53503fee",
  "./IntersectionTests-8abf6dba",
  "./Plane-c8971487",
  "./GeometryOffsetAttribute-7350d9af",
  "./GeometryInstance-161eaba2",
  "./arrayRemoveDuplicates-ebc732b0",
  "./EllipsoidTangentPlane-64140317",
  "./ArcType-dc1c5aee",
  "./EllipsoidRhumbLine-c704bf4c",
  "./PolygonPipeline-b9585f01",
  "./PolygonGeometryLibrary-eba8dd45",
], function (
  m,
  e,
  b,
  d,
  P,
  t,
  i,
  E,
  A,
  _,
  r,
  v,
  o,
  G,
  n,
  a,
  L,
  T,
  l,
  H,
  C,
  s,
  O,
  D
) {
  "use strict";
  var x = [],
    I = [];
  function c(e) {
    var t,
      i = e.polygonHierarchy,
      r = m.defaultValue(e.ellipsoid, d.Ellipsoid.WGS84),
      o = m.defaultValue(e.granularity, b.CesiumMath.RADIANS_PER_DEGREE),
      n = m.defaultValue(e.perPositionHeight, !1),
      a = n && m.defined(e.extrudedHeight),
      l = m.defaultValue(e.arcType, C.ArcType.GEODESIC),
      s = m.defaultValue(e.height, 0),
      y = m.defaultValue(e.extrudedHeight, s);
    a || ((t = Math.max(s, y)), (y = Math.min(s, y)), (s = t)),
      (this._ellipsoid = d.Ellipsoid.clone(r)),
      (this._granularity = o),
      (this._height = s),
      (this._extrudedHeight = y),
      (this._arcType = l),
      (this._polygonHierarchy = i),
      (this._perPositionHeight = n),
      (this._perPositionHeightExtrude = a),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = "createPolygonOutlineGeometry"),
      (this.packedLength =
        D.PolygonGeometryLibrary.computeHierarchyPackedLength(i) +
        d.Ellipsoid.packedLength +
        8);
  }
  c.pack = function (e, t, i) {
    return (
      (i = m.defaultValue(i, 0)),
      (i = D.PolygonGeometryLibrary.packPolygonHierarchy(
        e._polygonHierarchy,
        t,
        i
      )),
      d.Ellipsoid.pack(e._ellipsoid, t, i),
      (i += d.Ellipsoid.packedLength),
      (t[i++] = e._height),
      (t[i++] = e._extrudedHeight),
      (t[i++] = e._granularity),
      (t[i++] = e._perPositionHeightExtrude ? 1 : 0),
      (t[i++] = e._perPositionHeight ? 1 : 0),
      (t[i++] = e._arcType),
      (t[i++] = m.defaultValue(e._offsetAttribute, -1)),
      (t[i] = e.packedLength),
      t
    );
  };
  var g = d.Ellipsoid.clone(d.Ellipsoid.UNIT_SPHERE),
    f = { polygonHierarchy: {} };
  return (
    (c.unpack = function (e, t, i) {
      t = m.defaultValue(t, 0);
      var r = D.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t);
      (t = r.startingIndex), delete r.startingIndex;
      var o = d.Ellipsoid.unpack(e, t, g);
      t += d.Ellipsoid.packedLength;
      var n = e[t++],
        a = e[t++],
        l = e[t++],
        s = 1 === e[t++],
        y = 1 === e[t++],
        u = e[t++],
        p = e[t++],
        t = e[t];
      return (
        m.defined(i) || (i = new c(f)),
        (i._polygonHierarchy = r),
        (i._ellipsoid = d.Ellipsoid.clone(o, i._ellipsoid)),
        (i._height = n),
        (i._extrudedHeight = a),
        (i._granularity = l),
        (i._perPositionHeight = y),
        (i._perPositionHeightExtrude = s),
        (i._arcType = u),
        (i._offsetAttribute = -1 === p ? void 0 : p),
        (i.packedLength = t),
        i
      );
    }),
    (c.fromPositions = function (e) {
      return new c({
        polygonHierarchy: {
          positions: (e = m.defaultValue(e, m.defaultValue.EMPTY_OBJECT))
            .positions,
        },
        height: e.height,
        extrudedHeight: e.extrudedHeight,
        ellipsoid: e.ellipsoid,
        granularity: e.granularity,
        perPositionHeight: e.perPositionHeight,
        arcType: e.arcType,
        offsetAttribute: e.offsetAttribute,
      });
    }),
    (c.createGeometry = function (e) {
      var t = e._ellipsoid,
        i = e._granularity,
        r = e._polygonHierarchy,
        o = e._perPositionHeight,
        n = e._arcType,
        a = D.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(r, !o, t);
      if (0 !== a.length) {
        var l,
          s,
          y,
          u,
          p,
          d,
          c = [],
          g = b.CesiumMath.chordLength(i, t.maximumRadius),
          f = e._height,
          h = e._extrudedHeight;
        if (
          e._perPositionHeightExtrude ||
          !b.CesiumMath.equalsEpsilon(f, h, 0, b.CesiumMath.EPSILON2)
        )
          for (l = 0; l < a.length; l++)
            ((u = (function (e, t, i, r, o) {
              var n,
                a = H.EllipsoidTangentPlane.fromPoints(
                  t,
                  e
                ).projectPointsOntoPlane(t, x);
              O.PolygonPipeline.computeWindingOrder2D(a) ===
                O.WindingOrder.CLOCKWISE &&
                (a.reverse(), (t = t.slice().reverse()));
              var l = t.length,
                s = new Array(l),
                y = 0;
              if (r)
                for (n = new Float64Array(2 * l * 3 * 2), b = 0; b < l; ++b) {
                  s[b] = y / 3;
                  var u = t[b],
                    p = t[(b + 1) % l];
                  (n[y++] = u.x),
                    (n[y++] = u.y),
                    (n[y++] = u.z),
                    (n[y++] = p.x),
                    (n[y++] = p.y),
                    (n[y++] = p.z);
                }
              else {
                var d,
                  c = 0;
                if (o === C.ArcType.GEODESIC)
                  for (b = 0; b < l; b++)
                    c += D.PolygonGeometryLibrary.subdivideLineCount(
                      t[b],
                      t[(b + 1) % l],
                      i
                    );
                else if (o === C.ArcType.RHUMB)
                  for (b = 0; b < l; b++)
                    c += D.PolygonGeometryLibrary.subdivideRhumbLineCount(
                      e,
                      t[b],
                      t[(b + 1) % l],
                      i
                    );
                for (n = new Float64Array(3 * c * 2), b = 0; b < l; ++b) {
                  (s[b] = y / 3),
                    o === C.ArcType.GEODESIC
                      ? (d = D.PolygonGeometryLibrary.subdivideLine(
                          t[b],
                          t[(b + 1) % l],
                          i,
                          I
                        ))
                      : o === C.ArcType.RHUMB &&
                        (d = D.PolygonGeometryLibrary.subdivideRhumbLine(
                          e,
                          t[b],
                          t[(b + 1) % l],
                          i,
                          I
                        ));
                  for (var g = d.length, f = 0; f < g; ++f) n[y++] = d[f];
                }
              }
              l = n.length / 6;
              for (
                var h = s.length,
                  r = 2 * (2 * l + h),
                  m = G.IndexDatatype.createTypedArray(l + h, r),
                  y = 0,
                  b = 0;
                b < l;
                ++b
              )
                (m[y++] = b),
                  (m[y++] = (b + 1) % l),
                  (m[y++] = b + l),
                  (m[y++] = ((b + 1) % l) + l);
              for (b = 0; b < h; b++) {
                var P = s[b];
                (m[y++] = P), (m[y++] = P + l);
              }
              return new T.GeometryInstance({
                geometry: new A.Geometry({
                  attributes: new _.GeometryAttributes({
                    position: new A.GeometryAttribute({
                      componentDatatype: E.ComponentDatatype.DOUBLE,
                      componentsPerAttribute: 3,
                      values: n,
                    }),
                  }),
                  indices: m,
                  primitiveType: A.PrimitiveType.LINES,
                }),
              });
            })(
              t,
              a[l],
              g,
              o,
              n
            )).geometry = D.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
              u.geometry,
              f,
              h,
              t,
              o
            )),
              m.defined(e._offsetAttribute) &&
                ((s = u.geometry.attributes.position.values.length / 3),
                (y = new Uint8Array(s)),
                (y =
                  e._offsetAttribute === L.GeometryOffsetAttribute.TOP
                    ? L.arrayFill(y, 1, 0, s / 2)
                    : ((d =
                        e._offsetAttribute === L.GeometryOffsetAttribute.NONE
                          ? 0
                          : 1),
                      L.arrayFill(y, d))),
                (u.geometry.attributes.applyOffset = new A.GeometryAttribute({
                  componentDatatype: E.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: y,
                }))),
              c.push(u);
        else
          for (l = 0; l < a.length; l++)
            ((u = (function (e, t, i, r, o) {
              var n,
                a = H.EllipsoidTangentPlane.fromPoints(
                  t,
                  e
                ).projectPointsOntoPlane(t, x);
              O.PolygonPipeline.computeWindingOrder2D(a) ===
                O.WindingOrder.CLOCKWISE &&
                (a.reverse(), (t = t.slice().reverse()));
              var l = t.length,
                s = 0;
              if (r)
                for (n = new Float64Array(2 * l * 3), h = 0; h < l; h++) {
                  var y = t[h],
                    u = t[(h + 1) % l];
                  (n[s++] = y.x),
                    (n[s++] = y.y),
                    (n[s++] = y.z),
                    (n[s++] = u.x),
                    (n[s++] = u.y),
                    (n[s++] = u.z);
                }
              else {
                var p,
                  d = 0;
                if (o === C.ArcType.GEODESIC)
                  for (h = 0; h < l; h++)
                    d += D.PolygonGeometryLibrary.subdivideLineCount(
                      t[h],
                      t[(h + 1) % l],
                      i
                    );
                else if (o === C.ArcType.RHUMB)
                  for (h = 0; h < l; h++)
                    d += D.PolygonGeometryLibrary.subdivideRhumbLineCount(
                      e,
                      t[h],
                      t[(h + 1) % l],
                      i
                    );
                for (n = new Float64Array(3 * d), h = 0; h < l; h++) {
                  o === C.ArcType.GEODESIC
                    ? (p = D.PolygonGeometryLibrary.subdivideLine(
                        t[h],
                        t[(h + 1) % l],
                        i,
                        I
                      ))
                    : o === C.ArcType.RHUMB &&
                      (p = D.PolygonGeometryLibrary.subdivideRhumbLine(
                        e,
                        t[h],
                        t[(h + 1) % l],
                        i,
                        I
                      ));
                  for (var c = p.length, g = 0; g < c; ++g) n[s++] = p[g];
                }
              }
              for (
                var r = 2 * (l = n.length / 3),
                  f = G.IndexDatatype.createTypedArray(l, r),
                  s = 0,
                  h = 0;
                h < l - 1;
                h++
              )
                (f[s++] = h), (f[s++] = h + 1);
              return (
                (f[s++] = l - 1),
                (f[s++] = 0),
                new T.GeometryInstance({
                  geometry: new A.Geometry({
                    attributes: new _.GeometryAttributes({
                      position: new A.GeometryAttribute({
                        componentDatatype: E.ComponentDatatype.DOUBLE,
                        componentsPerAttribute: 3,
                        values: n,
                      }),
                    }),
                    indices: f,
                    primitiveType: A.PrimitiveType.LINES,
                  }),
                })
              );
            })(
              t,
              a[l],
              g,
              o,
              n
            )).geometry.attributes.position.values = O.PolygonPipeline.scaleToGeodeticHeight(
              u.geometry.attributes.position.values,
              f,
              t,
              !o
            )),
              m.defined(e._offsetAttribute) &&
                ((p = u.geometry.attributes.position.values.length),
                (p = new Uint8Array(p / 3)),
                (d =
                  e._offsetAttribute === L.GeometryOffsetAttribute.NONE
                    ? 0
                    : 1),
                L.arrayFill(p, d),
                (u.geometry.attributes.applyOffset = new A.GeometryAttribute({
                  componentDatatype: E.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: p,
                }))),
              c.push(u);
        (r = v.GeometryPipeline.combineInstances(c)[0]),
          (i = P.BoundingSphere.fromVertices(r.attributes.position.values));
        return new A.Geometry({
          attributes: r.attributes,
          indices: r.indices,
          primitiveType: r.primitiveType,
          boundingSphere: i,
          offsetAttribute: e._offsetAttribute,
        });
      }
    }),
    function (e, t) {
      return (
        m.defined(t) && (e = c.unpack(e, t)),
        (e._ellipsoid = d.Ellipsoid.clone(e._ellipsoid)),
        c.createGeometry(e)
      );
    }
  );
});
