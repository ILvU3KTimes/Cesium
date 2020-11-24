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
  "./VertexFormat-7572c785",
  "./EllipseGeometryLibrary-55d6b793",
  "./GeometryInstance-161eaba2",
  "./EllipseGeometry-1afae560",
], function (r, e, t, o, i, a, n, s, l, d, m, c, u, p, y, _, h, G, x, f, g) {
  "use strict";
  function b(e) {
    var t = (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)).radius,
      e = {
        center: e.center,
        semiMajorAxis: t,
        semiMinorAxis: t,
        ellipsoid: e.ellipsoid,
        height: e.height,
        extrudedHeight: e.extrudedHeight,
        granularity: e.granularity,
        vertexFormat: e.vertexFormat,
        stRotation: e.stRotation,
        shadowVolume: e.shadowVolume,
      };
    (this._ellipseGeometry = new g.EllipseGeometry(e)),
      (this._workerName = "createCircleGeometry");
  }
  (b.packedLength = g.EllipseGeometry.packedLength),
    (b.pack = function (e, t, i) {
      return g.EllipseGeometry.pack(e._ellipseGeometry, t, i);
    });
  var E = new g.EllipseGeometry({
      center: new o.Cartesian3(),
      semiMajorAxis: 1,
      semiMinorAxis: 1,
    }),
    v = {
      center: new o.Cartesian3(),
      radius: void 0,
      ellipsoid: o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),
      height: void 0,
      extrudedHeight: void 0,
      granularity: void 0,
      vertexFormat: new G.VertexFormat(),
      stRotation: void 0,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      shadowVolume: void 0,
    };
  return (
    (b.unpack = function (e, t, i) {
      t = g.EllipseGeometry.unpack(e, t, E);
      return (
        (v.center = o.Cartesian3.clone(t._center, v.center)),
        (v.ellipsoid = o.Ellipsoid.clone(t._ellipsoid, v.ellipsoid)),
        (v.height = t._height),
        (v.extrudedHeight = t._extrudedHeight),
        (v.granularity = t._granularity),
        (v.vertexFormat = G.VertexFormat.clone(
          t._vertexFormat,
          v.vertexFormat
        )),
        (v.stRotation = t._stRotation),
        (v.shadowVolume = t._shadowVolume),
        r.defined(i)
          ? ((v.semiMajorAxis = t._semiMajorAxis),
            (v.semiMinorAxis = t._semiMinorAxis),
            (i._ellipseGeometry = new g.EllipseGeometry(v)),
            i)
          : ((v.radius = t._semiMajorAxis), new b(v))
      );
    }),
    (b.createGeometry = function (e) {
      return g.EllipseGeometry.createGeometry(e._ellipseGeometry);
    }),
    (b.createShadowVolume = function (e, t, i) {
      var r = e._ellipseGeometry._granularity,
        o = e._ellipseGeometry._ellipsoid,
        t = t(r, o),
        i = i(r, o);
      return new b({
        center: e._ellipseGeometry._center,
        radius: e._ellipseGeometry._semiMajorAxis,
        ellipsoid: o,
        stRotation: e._ellipseGeometry._stRotation,
        granularity: r,
        extrudedHeight: t,
        height: i,
        vertexFormat: G.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      });
    }),
    Object.defineProperties(b.prototype, {
      rectangle: {
        get: function () {
          return this._ellipseGeometry.rectangle;
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return this._ellipseGeometry.textureCoordinateRotationPoints;
        },
      },
    }),
    function (e, t) {
      return (
        r.defined(t) && (e = b.unpack(e, t)),
        (e._ellipseGeometry._center = o.Cartesian3.clone(
          e._ellipseGeometry._center
        )),
        (e._ellipseGeometry._ellipsoid = o.Ellipsoid.clone(
          e._ellipseGeometry._ellipsoid
        )),
        b.createGeometry(e)
      );
    }
  );
});
