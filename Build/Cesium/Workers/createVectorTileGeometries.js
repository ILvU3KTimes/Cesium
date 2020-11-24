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
  "./IndexDatatype-53503fee",
  "./createTaskProcessorWorker",
  "./GeometryOffsetAttribute-7350d9af",
  "./VertexFormat-7572c785",
  "./BoxGeometry-7dc94aad",
  "./CylinderGeometryLibrary-b0214ab1",
  "./CylinderGeometry-e0cec806",
  "./EllipsoidGeometry-2c4c641e",
  "./Color-bac25fae",
], function (S, e, t, T, V, n, r, a, i, o, k, d, s, c, M, f, B, w, F) {
  "use strict";
  function R(e) {
    (this.offset = e.offset),
      (this.count = e.count),
      (this.color = e.color),
      (this.batchIds = e.batchIds);
  }
  var l = new T.Cartesian3(),
    u = V.Matrix4.packedLength + T.Cartesian3.packedLength,
    h = V.Matrix4.packedLength + 2,
    b = V.Matrix4.packedLength + T.Cartesian3.packedLength,
    p = T.Cartesian3.packedLength + 1,
    y = {
      modelMatrix: new V.Matrix4(),
      boundingVolume: new V.BoundingSphere(),
    };
  function A(e, t) {
    var n = t * u,
      t = T.Cartesian3.unpack(e, n, l);
    n += T.Cartesian3.packedLength;
    n = V.Matrix4.unpack(e, n, y.modelMatrix);
    V.Matrix4.multiplyByScale(n, t, n);
    n = y.boundingVolume;
    return (
      T.Cartesian3.clone(T.Cartesian3.ZERO, n.center),
      (n.radius = Math.sqrt(3)),
      y
    );
  }
  function O(e, t) {
    var n = t * h,
      r = e[n++],
      t = e[n++],
      t = T.Cartesian3.fromElements(r, r, t, l),
      n = V.Matrix4.unpack(e, n, y.modelMatrix);
    V.Matrix4.multiplyByScale(n, t, n);
    n = y.boundingVolume;
    return (
      T.Cartesian3.clone(T.Cartesian3.ZERO, n.center),
      (n.radius = Math.sqrt(2)),
      y
    );
  }
  function L(e, t) {
    var n = t * b,
      t = T.Cartesian3.unpack(e, n, l);
    n += T.Cartesian3.packedLength;
    n = V.Matrix4.unpack(e, n, y.modelMatrix);
    V.Matrix4.multiplyByScale(n, t, n);
    n = y.boundingVolume;
    return T.Cartesian3.clone(T.Cartesian3.ZERO, n.center), (n.radius = 1), y;
  }
  function E(e, t) {
    var n = t * p,
      t = e[n++],
      n = T.Cartesian3.unpack(e, n, l),
      n = V.Matrix4.fromTranslation(n, y.modelMatrix);
    V.Matrix4.multiplyByUniformScale(n, t, n);
    n = y.boundingVolume;
    return T.Cartesian3.clone(T.Cartesian3.ZERO, n.center), (n.radius = 1), y;
  }
  var Z = new T.Cartesian3();
  function U(e, t, n, r, a) {
    if (S.defined(t)) {
      for (
        var i = n.length,
          o = r.attributes.position.values,
          d = r.indices,
          s = e.positions,
          c = e.vertexBatchIds,
          f = e.indices,
          l = e.batchIds,
          u = e.batchTableColors,
          h = e.batchedIndices,
          b = e.indexOffsets,
          p = e.indexCounts,
          y = e.boundingVolumes,
          x = e.modelMatrix,
          g = e.center,
          C = e.positionOffset,
          m = e.batchIdIndex,
          v = e.indexOffset,
          I = e.batchedIndicesOffset,
          k = 0;
        k < i;
        ++k
      ) {
        var M = a(t, k),
          B = M.modelMatrix;
        V.Matrix4.multiply(x, B, B);
        for (var w = n[k], A = o.length, O = 0; O < A; O += 3) {
          var L = T.Cartesian3.unpack(o, O, Z);
          V.Matrix4.multiplyByPoint(B, L, L),
            T.Cartesian3.subtract(L, g, L),
            T.Cartesian3.pack(L, s, 3 * C + O),
            (c[m++] = w);
        }
        for (var E = d.length, U = 0; U < E; ++U) f[v + U] = d[U] + C;
        var G = k + I;
        (h[G] = new R({
          offset: v,
          count: E,
          color: F.Color.fromRgba(u[w]),
          batchIds: [w],
        })),
          (l[G] = w),
          (b[G] = v),
          (p[G] = E),
          (y[G] = V.BoundingSphere.transform(M.boundingVolume, B)),
          (C += A / 3),
          (v += E);
      }
      (e.positionOffset = C),
        (e.batchIdIndex = m),
        (e.indexOffset = v),
        (e.batchedIndicesOffset += i);
    }
  }
  var G = new T.Cartesian3(),
    D = new V.Matrix4();
  function P(e, t, n) {
    var r = n.length,
      a =
        2 +
        r * V.BoundingSphere.packedLength +
        1 +
        (function (e) {
          for (var t = e.length, n = 0, r = 0; r < t; ++r)
            n += F.Color.packedLength + 3 + e[r].batchIds.length;
          return n;
        })(t),
      i = new Float64Array(a),
      o = 0;
    (i[o++] = e), (i[o++] = r);
    for (var d = 0; d < r; ++d)
      V.BoundingSphere.pack(n[d], i, o), (o += V.BoundingSphere.packedLength);
    var s = t.length;
    i[o++] = s;
    for (var c = 0; c < s; ++c) {
      var f = t[c];
      F.Color.pack(f.color, i, o),
        (o += F.Color.packedLength),
        (i[o++] = f.offset),
        (i[o++] = f.count);
      var l = f.batchIds,
        u = l.length;
      i[o++] = u;
      for (var h = 0; h < u; ++h) i[o++] = l[h];
    }
    return i;
  }
  return d(function (e, t) {
    var n = S.defined(e.boxes) ? new Float32Array(e.boxes) : void 0,
      r = S.defined(e.boxBatchIds) ? new Uint16Array(e.boxBatchIds) : void 0,
      a = S.defined(e.cylinders) ? new Float32Array(e.cylinders) : void 0,
      i = S.defined(e.cylinderBatchIds)
        ? new Uint16Array(e.cylinderBatchIds)
        : void 0,
      o = S.defined(e.ellipsoids) ? new Float32Array(e.ellipsoids) : void 0,
      d = S.defined(e.ellipsoidBatchIds)
        ? new Uint16Array(e.ellipsoidBatchIds)
        : void 0,
      s = S.defined(e.spheres) ? new Float32Array(e.spheres) : void 0,
      c = S.defined(e.sphereBatchIds)
        ? new Uint16Array(e.sphereBatchIds)
        : void 0,
      f = S.defined(n) ? r.length : 0,
      l = S.defined(a) ? i.length : 0,
      u = S.defined(o) ? d.length : 0,
      h = S.defined(s) ? c.length : 0,
      b = M.BoxGeometry.getUnitBox(),
      p = B.CylinderGeometry.getUnitCylinder(),
      y = w.EllipsoidGeometry.getUnitEllipsoid(),
      x = b.attributes.position.values,
      g = p.attributes.position.values,
      C = y.attributes.position.values,
      m = x.length * f;
    (m += g.length * l), (m += C.length * (u + h));
    var v = b.indices,
      I = p.indices,
      x = y.indices,
      g = v.length * f;
    return (
      (g += I.length * l),
      (g += x.length * (u + h)),
      (C = new Float32Array(m)),
      (v = new Uint16Array(m / 3)),
      (I = k.IndexDatatype.createTypedArray(m / 3, g)),
      (x = f + l + u + h),
      (m = new Uint16Array(x)),
      (g = new Array(x)),
      (f = new Uint32Array(x)),
      (l = new Uint32Array(x)),
      (u = new Array(x)),
      (h = e.packedBuffer),
      (x = new Float64Array(h)),
      (h = 0),
      T.Cartesian3.unpack(x, 0, G),
      (h += T.Cartesian3.packedLength),
      V.Matrix4.unpack(x, h, D),
      U(
        (e = {
          batchTableColors: new Uint32Array(e.batchTableColors),
          positions: C,
          vertexBatchIds: v,
          indices: I,
          batchIds: m,
          batchedIndices: g,
          indexOffsets: f,
          indexCounts: l,
          boundingVolumes: u,
          positionOffset: 0,
          batchIdIndex: 0,
          indexOffset: 0,
          batchedIndicesOffset: 0,
          modelMatrix: D,
          center: G,
        }),
        n,
        r,
        b,
        A
      ),
      U(e, a, i, p, O),
      U(e, o, d, y, L),
      U(e, s, c, y, E),
      (u = P(I.BYTES_PER_ELEMENT, g, u)),
      t.push(C.buffer, v.buffer, I.buffer),
      t.push(m.buffer, f.buffer, l.buffer),
      t.push(u.buffer),
      {
        positions: C.buffer,
        vertexBatchIds: v.buffer,
        indices: I.buffer,
        indexOffsets: f.buffer,
        indexCounts: l.buffer,
        batchIds: m.buffer,
        packedBuffer: u.buffer,
      }
    );
  });
});
