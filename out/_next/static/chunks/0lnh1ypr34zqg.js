(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  68877,
  (e) => {
    "use strict";
    var s = e.i(56420);
    let t = {
      name: "arrow-right",
      size: 24,
      node: [
        ["path", { d: "M5 12h14", key: "1ays0h" }],
        ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
      ],
    };
    t.node;
    let a = (0, s.default)(t);
    e.s(["ArrowRight", 0, a], 68877);
  },
  51757,
  (e) => {
    "use strict";
    var s = e.i(56420);
    let t = {
      name: "circle-check",
      size: 24,
      node: [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["path", { d: "m16 9-5.5 5.5L8 12", key: "xofnsj" }],
      ],
      aliases: ["check-circle-2"],
    };
    t.node;
    let a = (0, s.default)(t);
    e.s(["CheckCircle2", 0, a], 51757);
  },
  83967,
  (e) => {
    "use strict";
    var s = e.i(56420);
    let t = {
      name: "circle-x",
      size: 24,
      node: [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
        ["path", { d: "m9 9 6 6", key: "z0biqf" }],
      ],
      aliases: ["x-circle"],
    };
    t.node;
    let a = (0, s.default)(t);
    e.s(["XCircle", 0, a], 83967);
  },
  74544,
  (e) => {
    "use strict";
    var s = e.i(56420);
    let t = {
      name: "clock",
      size: 24,
      node: [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
      ],
    };
    t.node;
    let a = (0, s.default)(t);
    e.s(["Clock", 0, a], 74544);
  },
  26091,
  (e) => {
    "use strict";
    var s = e.i(56420);
    let t = {
      name: "file-text",
      size: 24,
      node: [
        [
          "path",
          {
            d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
            key: "1oefj6",
          },
        ],
        ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
        ["path", { d: "M10 9H8", key: "b1mrlr" }],
        ["path", { d: "M16 13H8", key: "t4e002" }],
        ["path", { d: "M16 17H8", key: "z1uh3a" }],
      ],
    };
    t.node;
    let a = (0, s.default)(t);
    e.s(["FileText", 0, a], 26091);
  },
  35220,
  (e) => {
    "use strict";
    var s = e.i(43476),
      t = e.i(932),
      a = e.i(22016),
      r = e.i(94517),
      i = e.i(38580),
      l = e.i(15288),
      d = e.i(19455),
      c = e.i(56420);
    let n = {
      name: "clipboard-list",
      size: 24,
      node: [
        [
          "rect",
          {
            width: "8",
            height: "4",
            x: "8",
            y: "2",
            rx: "1",
            ry: "1",
            key: "tgr4d6",
          },
        ],
        [
          "path",
          {
            d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
            key: "116196",
          },
        ],
        ["path", { d: "M12 11h4", key: "1jrz19" }],
        ["path", { d: "M12 16h4", key: "n85exb" }],
        ["path", { d: "M8 11h.01", key: "1dfujw" }],
        ["path", { d: "M8 16h.01", key: "18s6g9" }],
      ],
    };
    n.node;
    let o = (0, c.default)(n);
    var u = e.i(74544),
      m = e.i(51757),
      x = e.i(83967),
      h = e.i(68877),
      f = e.i(88692),
      b = e.i(35264),
      g = e.i(7132);
    e.s(
      [
        "default",
        0,
        function () {
          let e,
            c,
            n,
            v,
            y,
            p,
            j,
            N,
            q,
            k,
            w,
            S,
            C,
            R,
            T,
            _,
            z,
            A,
            E,
            P,
            Q,
            K,
            M,
            H,
            G,
            D = (0, t.c)(45),
            { data: F, isLoading: B } = (0, r.useGetStaffDashboardStats)(),
            {
              data: O,
              isLoading: L,
              refetch: $,
            } = (0, i.useGetStaffAssignedRequests)();
          if (B || L) {
            let e;
            return (
              D[0] === Symbol.for("react.memo_cache_sentinel")
                ? ((e = (0, s.jsx)(b.OverviewSkeleton, {})), (D[0] = e))
                : (e = D[0]),
              e
            );
          }
          D[1] !== F?.data
            ? ((e = F?.data || {
                totalAssignedRequests: 0,
                inProgressRequests: 0,
                resolvedRequests: 0,
                cancelledRequests: 0,
                rejectedRequests: 0,
              }),
              (D[1] = F?.data),
              (D[2] = e))
            : (e = D[2]);
          let U = e;
          (D[3] !== O?.data
            ? ((c = O?.data || []), (D[3] = O?.data), (D[4] = c))
            : (c = D[4]),
            D[5] !== c
              ? ((n = c.slice(0, 5)), (D[5] = c), (D[6] = n))
              : (n = D[6]));
          let I = n;
          (D[7] === Symbol.for("react.memo_cache_sentinel")
            ? ((v = (0, s.jsx)(g.default, {
                title: (0, s.jsxs)(s.Fragment, {
                  children: [
                    "Staff Dashboard ",
                    (0, s.jsx)("span", {
                      className: "text-blue-400",
                      children: "Overview",
                    }),
                  ],
                }),
                description:
                  " Welcome back! Here is a summary of your assigned service requests and\r\n          progress.",
              })),
              (D[7] = v))
            : (v = D[7]),
            D[8] === Symbol.for("react.memo_cache_sentinel")
              ? ((y = (0, s.jsx)("p", {
                  className:
                    "text-xs font-medium text-slate-500 uppercase tracking-wider",
                  children: "Total Assigned",
                })),
                (D[8] = y))
              : (y = D[8]),
            D[9] !== U.totalAssignedRequests
              ? ((p = (0, s.jsxs)("div", {
                  children: [
                    y,
                    (0, s.jsx)("h3", {
                      className: "text-2xl font-bold text-slate-800 mt-1",
                      children: U.totalAssignedRequests,
                    }),
                  ],
                })),
                (D[9] = U.totalAssignedRequests),
                (D[10] = p))
              : (p = D[10]),
            D[11] === Symbol.for("react.memo_cache_sentinel")
              ? ((j = (0, s.jsx)("div", {
                  className:
                    "size-11 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center",
                  children: (0, s.jsx)(o, { className: "size-6" }),
                })),
                (D[11] = j))
              : (j = D[11]),
            D[12] !== p
              ? ((N = (0, s.jsx)(l.Card, {
                  className: "border-indigo-100 shadow-sm",
                  children: (0, s.jsxs)(l.CardContent, {
                    className: "p-5 flex items-center justify-between",
                    children: [p, j],
                  }),
                })),
                (D[12] = p),
                (D[13] = N))
              : (N = D[13]),
            D[14] === Symbol.for("react.memo_cache_sentinel")
              ? ((q = (0, s.jsx)("p", {
                  className:
                    "text-xs font-medium text-slate-500 uppercase tracking-wider",
                  children: "In Progress",
                })),
                (D[14] = q))
              : (q = D[14]),
            D[15] !== U.inProgressRequests
              ? ((k = (0, s.jsxs)("div", {
                  children: [
                    q,
                    (0, s.jsx)("h3", {
                      className: "text-2xl font-bold text-purple-700 mt-1",
                      children: U.inProgressRequests,
                    }),
                  ],
                })),
                (D[15] = U.inProgressRequests),
                (D[16] = k))
              : (k = D[16]),
            D[17] === Symbol.for("react.memo_cache_sentinel")
              ? ((w = (0, s.jsx)("div", {
                  className:
                    "size-11 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center",
                  children: (0, s.jsx)(u.Clock, { className: "size-6" }),
                })),
                (D[17] = w))
              : (w = D[17]),
            D[18] !== k
              ? ((S = (0, s.jsx)(l.Card, {
                  className: "border-purple-100 shadow-sm",
                  children: (0, s.jsxs)(l.CardContent, {
                    className: "p-5 flex items-center justify-between",
                    children: [k, w],
                  }),
                })),
                (D[18] = k),
                (D[19] = S))
              : (S = D[19]),
            D[20] === Symbol.for("react.memo_cache_sentinel")
              ? ((C = (0, s.jsx)("p", {
                  className:
                    "text-xs font-medium text-slate-500 uppercase tracking-wider",
                  children: "Resolved Tasks",
                })),
                (D[20] = C))
              : (C = D[20]),
            D[21] !== U.resolvedRequests
              ? ((R = (0, s.jsxs)("div", {
                  children: [
                    C,
                    (0, s.jsx)("h3", {
                      className: "text-2xl font-bold text-emerald-700 mt-1",
                      children: U.resolvedRequests,
                    }),
                  ],
                })),
                (D[21] = U.resolvedRequests),
                (D[22] = R))
              : (R = D[22]),
            D[23] === Symbol.for("react.memo_cache_sentinel")
              ? ((T = (0, s.jsx)("div", {
                  className:
                    "size-11 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center",
                  children: (0, s.jsx)(m.CheckCircle2, { className: "size-6" }),
                })),
                (D[23] = T))
              : (T = D[23]),
            D[24] !== R
              ? ((_ = (0, s.jsx)(l.Card, {
                  className: "border-emerald-100 shadow-sm",
                  children: (0, s.jsxs)(l.CardContent, {
                    className: "p-5 flex items-center justify-between",
                    children: [R, T],
                  }),
                })),
                (D[24] = R),
                (D[25] = _))
              : (_ = D[25]),
            D[26] === Symbol.for("react.memo_cache_sentinel")
              ? ((z = (0, s.jsx)("p", {
                  className:
                    "text-xs font-medium text-slate-500 uppercase tracking-wider",
                  children: "Closed / Rejected",
                })),
                (D[26] = z))
              : (z = D[26]));
          let V = U.cancelledRequests + U.rejectedRequests;
          return (
            D[27] !== V
              ? ((A = (0, s.jsxs)("div", {
                  children: [
                    z,
                    (0, s.jsx)("h3", {
                      className: "text-2xl font-bold text-rose-600 mt-1",
                      children: V,
                    }),
                  ],
                })),
                (D[27] = V),
                (D[28] = A))
              : (A = D[28]),
            D[29] === Symbol.for("react.memo_cache_sentinel")
              ? ((E = (0, s.jsx)("div", {
                  className:
                    "size-11 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center",
                  children: (0, s.jsx)(x.XCircle, { className: "size-6" }),
                })),
                (D[29] = E))
              : (E = D[29]),
            D[30] !== A
              ? ((P = (0, s.jsx)(l.Card, {
                  className: "border-rose-100 shadow-sm",
                  children: (0, s.jsxs)(l.CardContent, {
                    className: "p-5 flex items-center justify-between",
                    children: [A, E],
                  }),
                })),
                (D[30] = A),
                (D[31] = P))
              : (P = D[31]),
            D[32] !== S || D[33] !== _ || D[34] !== P || D[35] !== N
              ? ((Q = (0, s.jsxs)("div", {
                  className:
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 ",
                  children: [N, S, _, P],
                })),
                (D[32] = S),
                (D[33] = _),
                (D[34] = P),
                (D[35] = N),
                (D[36] = Q))
              : (Q = D[36]),
            D[37] === Symbol.for("react.memo_cache_sentinel")
              ? ((K = (0, s.jsx)("h2", {
                  className: "text-base font-bold text-slate-800",
                  children: "Recent Assigned Requests",
                })),
                (D[37] = K))
              : (K = D[37]),
            D[38] === Symbol.for("react.memo_cache_sentinel")
              ? ((M = (0, s.jsxs)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    K,
                    (0, s.jsx)(a.default, {
                      href: "/staff-dashboard/assigned-requests",
                      children: (0, s.jsxs)(d.Button, {
                        variant: "ghost",
                        size: "sm",
                        className:
                          "text-xs text-indigo-600 hover:text-indigo-700",
                        children: [
                          "View All ",
                          (0, s.jsx)(h.ArrowRight, {
                            className: "size-3.5 ml-1",
                          }),
                        ],
                      }),
                    }),
                  ],
                })),
                (D[38] = M))
              : (M = D[38]),
            D[39] !== I || D[40] !== $
              ? ((H = (0, s.jsxs)("div", {
                  className: "space-y-3",
                  children: [
                    M,
                    (0, s.jsx)(f.default, { requests: I, onSuccessUpdate: $ }),
                  ],
                })),
                (D[39] = I),
                (D[40] = $),
                (D[41] = H))
              : (H = D[41]),
            D[42] !== Q || D[43] !== H
              ? ((G = (0, s.jsxs)("div", {
                  className: "space-y-6",
                  children: [v, Q, H],
                })),
                (D[42] = Q),
                (D[43] = H),
                (D[44] = G))
              : (G = D[44]),
            G
          );
        },
      ],
      35220,
    );
  },
  35264,
  (e) => {
    "use strict";
    var s = e.i(43476),
      t = e.i(932);
    function a(e, t) {
      return (0, s.jsxs)(
        "div",
        {
          className: "flex-1 space-y-3 flex flex-col items-center",
          children: [
            (0, s.jsx)("div", {
              className:
                "w-full max-w-[50px] bg-slate-200 dark:bg-slate-800 rounded-t-lg",
              style: { height: `${e}%` },
            }),
            (0, s.jsx)("div", {
              className: "h-4 w-16 bg-slate-100 dark:bg-slate-800 rounded",
            }),
          ],
        },
        t,
      );
    }
    function r(e, t) {
      return (0, s.jsxs)(
        "div",
        {
          className: "flex gap-2 items-center",
          children: [
            (0, s.jsx)("div", {
              className: "size-3 bg-slate-200 dark:bg-slate-800 rounded-full",
            }),
            (0, s.jsx)("div", {
              className: "h-4 w-20 bg-slate-100 dark:bg-slate-800 rounded",
            }),
          ],
        },
        t,
      );
    }
    function i(e, t) {
      return (0, s.jsxs)(
        "div",
        {
          className:
            "p-6 border border-slate-200/70 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/50 shadow-sm space-y-4",
          children: [
            (0, s.jsxs)("div", {
              className: "flex justify-between items-center pb-1",
              children: [
                (0, s.jsx)("div", {
                  className: "h-5 w-36 bg-slate-200 dark:bg-slate-800 rounded",
                }),
                (0, s.jsx)("div", {
                  className: "size-6 bg-slate-100 dark:bg-slate-800 rounded-md",
                }),
              ],
            }),
            (0, s.jsx)("div", {
              className: "h-12 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg",
            }),
            (0, s.jsx)("div", {
              className: "h-4 w-48 bg-slate-100 dark:bg-slate-800/80 rounded",
            }),
          ],
        },
        t,
      );
    }
    e.s([
      "OverviewSkeleton",
      0,
      function () {
        let e,
          l,
          d,
          c,
          n,
          o,
          u,
          m = (0, t.c)(7);
        return (
          m[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, s.jsxs)("div", {
                className: "space-y-3",
                children: [
                  (0, s.jsx)("div", {
                    className:
                      "h-9 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg",
                  }),
                  (0, s.jsx)("div", {
                    className:
                      "h-5 w-full max-w-sm bg-slate-100 dark:bg-slate-800/80 rounded",
                  }),
                ],
              })),
              (m[0] = e))
            : (e = m[0]),
          m[1] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = (0, s.jsx)("div", {
                className:
                  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                children: [void 0, void 0, void 0, void 0].map(i),
              })),
              (m[1] = l))
            : (l = m[1]),
          m[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((d = (0, s.jsxs)("div", {
                className: "flex gap-3 items-center",
                children: [
                  (0, s.jsx)("div", {
                    className:
                      "size-5 bg-slate-100 dark:bg-slate-800 rounded-full",
                  }),
                  (0, s.jsx)("div", {
                    className:
                      "h-6 w-56 bg-slate-200 dark:bg-slate-800 rounded",
                  }),
                ],
              })),
              (m[2] = d))
            : (d = m[2]),
          m[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((c = (0, s.jsx)("div", {
                className: "relative flex justify-center items-center py-6",
                children: (0, s.jsx)("div", {
                  className:
                    "size-56 rounded-full bg-slate-100 dark:bg-slate-800 border-[28px] border-slate-200/60 dark:border-slate-800/60",
                }),
              })),
              (m[3] = c))
            : (c = m[3]),
          m[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = (0, s.jsxs)("div", {
                className:
                  "p-6 border border-slate-200/70 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/50 shadow-sm space-y-6",
                children: [
                  d,
                  c,
                  (0, s.jsx)("div", {
                    className: "flex justify-center gap-4 pt-2",
                    children: [void 0, void 0, void 0].map(r),
                  }),
                ],
              })),
              (m[4] = n))
            : (n = m[4]),
          m[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((o = (0, s.jsxs)("div", {
                className: "flex gap-3 items-center",
                children: [
                  (0, s.jsx)("div", {
                    className:
                      "size-5 bg-slate-100 dark:bg-slate-800 rounded-md",
                  }),
                  (0, s.jsx)("div", {
                    className:
                      "h-6 w-56 bg-slate-200 dark:bg-slate-800 rounded",
                  }),
                ],
              })),
              (m[5] = o))
            : (o = m[5]),
          m[6] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = (0, s.jsxs)("div", {
                className: "space-y-8 animate-pulse p-4 md:p-6 lg:p-8",
                children: [
                  e,
                  l,
                  (0, s.jsxs)("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                      n,
                      (0, s.jsxs)("div", {
                        className:
                          "p-6 border border-slate-200/70 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/50 shadow-sm space-y-6",
                        children: [
                          o,
                          (0, s.jsx)("div", {
                            className:
                              "relative h-[250px] w-full flex items-end justify-between gap-6 px-4 pt-10 border-b border-l border-slate-200/60 dark:border-slate-800",
                            children: [80, 50, 20, 15].map(a),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              })),
              (m[6] = u))
            : (u = m[6]),
          u
        );
      },
    ]);
  },
  88692,
  (e) => {
    "use strict";
    var s = e.i(43476),
      t = e.i(932),
      a = e.i(18566),
      r = e.i(84774),
      i = e.i(87486),
      l = e.i(19455),
      d = e.i(15288),
      c = e.i(51757),
      n = e.i(83967),
      o = e.i(56420);
    let u = {
      name: "circle-play",
      size: 24,
      node: [
        [
          "path",
          {
            d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
            key: "kmsa83",
          },
        ],
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
      ],
      aliases: ["play-circle"],
    };
    u.node;
    let m = (0, o.default)(u),
      x = {
        name: "check-check",
        size: 24,
        node: [
          ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
          ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }],
        ],
      };
    x.node;
    let h = (0, o.default)(x);
    var f = e.i(46696),
      b = e.i(38580);
    function g(e) {
      f.toast.error(e?.message || "Failed to update status.");
    }
    e.s(
      [
        "default",
        0,
        function (e) {
          let o,
            u,
            x,
            v,
            y = (0, t.c)(10),
            { requests: p, onSuccessUpdate: j } = e;
          (0, a.useRouter)();
          let { mutate: N, isPending: q } = (0,
          b.useUpdateStaffRequestStatus)();
          y[0] !== j || y[1] !== N
            ? ((o = (e, s) => {
                N(
                  { requestId: e, status: s },
                  {
                    onSuccess: () => {
                      (f.toast.success(`Request status updated to ${s}`),
                        j && j());
                    },
                    onError: g,
                  },
                );
              }),
              (y[0] = j),
              (y[1] = N),
              (y[2] = o))
            : (o = y[2]);
          let k = o;
          return (
            y[3] === Symbol.for("react.memo_cache_sentinel")
              ? ((u = (0, s.jsx)(r.TableHeader, {
                  children: (0, s.jsxs)(r.TableRow, {
                    children: [
                      (0, s.jsx)(r.TableHead, { children: "Service Title" }),
                      (0, s.jsx)(r.TableHead, { children: "Citizen" }),
                      (0, s.jsx)(r.TableHead, { children: "Service Type" }),
                      (0, s.jsx)(r.TableHead, { children: "Payment Status" }),
                      (0, s.jsx)(r.TableHead, { children: "Request Status" }),
                      (0, s.jsx)(r.TableHead, {
                        className: "text-right",
                        children: "Action",
                      }),
                    ],
                  }),
                })),
                (y[3] = u))
              : (u = y[3]),
            y[4] !== k || y[5] !== q || y[6] !== p
              ? ((x =
                  0 === p.length
                    ? (0, s.jsx)(r.TableRow, {
                        children: (0, s.jsx)(r.TableCell, {
                          colSpan: 6,
                          className:
                            "text-center py-8 text-slate-500 dark:text-slate-200",
                          children: "No service requests assigned to you yet.",
                        }),
                      })
                    : p.map((e) => {
                        let t =
                            e.category?.isPaid ??
                            (e.category?.type === "PAID" ||
                              (e.totalAmount && e.totalAmount > 0)),
                          a = e.isPaid;
                        return (0, s.jsxs)(
                          r.TableRow,
                          {
                            children: [
                              (0, s.jsx)(r.TableCell, {
                                className:
                                  "font-semibold text-slate-800 hover:text-blue-500 dark:text-white/50 cursor-pointer",
                                children: (0, s.jsx)("div", {
                                  className: "max-w-[250px] truncate ",
                                  title: e.title,
                                  children: e.title,
                                }),
                              }),
                              (0, s.jsx)(r.TableCell, {
                                className: "text-xs text-slate-600",
                                children:
                                  e.citizen?.name || e.user?.name || "N/A",
                              }),
                              (0, s.jsx)(r.TableCell, {
                                children: (0, s.jsx)(i.Badge, {
                                  variant: t ? "default" : "secondary",
                                  children: t
                                    ? `Paid (${e.totalAmount || e.amount || 0})`
                                    : "Free Service",
                                }),
                              }),
                              (0, s.jsx)(r.TableCell, {
                                children: t
                                  ? a
                                    ? (0, s.jsxs)(i.Badge, {
                                        className:
                                          "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
                                        children: [
                                          "Paid (",
                                          e.totalAmount || e.amount || 0,
                                          ")",
                                        ],
                                      })
                                    : (0, s.jsx)(i.Badge, {
                                        variant: "outline",
                                        className:
                                          "bg-amber-50 text-amber-600 border-amber-200",
                                        children: "Unpaid",
                                      })
                                  : (0, s.jsx)("span", {
                                      className:
                                        "text-xs text-slate-400 font-medium",
                                      children: "Not Required",
                                    }),
                              }),
                              (0, s.jsx)(r.TableCell, {
                                children: (0, s.jsx)(i.Badge, {
                                  variant: "outline",
                                  className: "font-mono text-xs",
                                  children: e.status,
                                }),
                              }),
                              (0, s.jsxs)(r.TableCell, {
                                className: "text-right",
                                children: [
                                  "ASSIGNED" === e.status &&
                                    (0, s.jsxs)("div", {
                                      className:
                                        "flex items-center justify-end gap-2",
                                      children: [
                                        (0, s.jsxs)(l.Button, {
                                          size: "sm",
                                          className:
                                            "bg-emerald-600 hover:bg-emerald-700 h-8 text-xs",
                                          onClick: () => k(e.id, "ACCEPTED"),
                                          disabled: q,
                                          children: [
                                            (0, s.jsx)(c.CheckCircle2, {
                                              className: "size-3.5 mr-1",
                                            }),
                                            "Accept",
                                          ],
                                        }),
                                        (0, s.jsxs)(l.Button, {
                                          size: "sm",
                                          variant: "destructive",
                                          className: "h-8 text-xs",
                                          onClick: () => k(e.id, "REJECTED"),
                                          disabled: q,
                                          children: [
                                            (0, s.jsx)(n.XCircle, {
                                              className: "size-3.5 mr-1",
                                            }),
                                            "Reject",
                                          ],
                                        }),
                                      ],
                                    }),
                                  "ACCEPTED" === e.status &&
                                    (0, s.jsxs)("div", {
                                      className:
                                        "flex flex-col items-end gap-1",
                                      children: [
                                        (0, s.jsxs)(l.Button, {
                                          size: "sm",
                                          className:
                                            "bg-indigo-600 hover:bg-indigo-700 h-8 text-xs",
                                          onClick: () => k(e.id, "IN_PROGRESS"),
                                          disabled: q || (t && !a),
                                          children: [
                                            (0, s.jsx)(m, {
                                              className: "size-3.5 mr-1",
                                            }),
                                            "Start Work",
                                          ],
                                        }),
                                        t &&
                                          !a &&
                                          (0, s.jsx)("span", {
                                            className:
                                              "text-[10px] text-rose-500 font-medium",
                                            children: "Awaiting Payment",
                                          }),
                                      ],
                                    }),
                                  "IN_PROGRESS" === e.status &&
                                    (0, s.jsxs)(l.Button, {
                                      size: "sm",
                                      className:
                                        "bg-blue-600 hover:bg-blue-700 h-8 text-xs ml-auto",
                                      onClick: () => k(e.id, "RESOLVED"),
                                      disabled: q,
                                      children: [
                                        (0, s.jsx)(h, {
                                          className: "size-3.5 mr-1",
                                        }),
                                        "Mark Resolved",
                                      ],
                                    }),
                                  [
                                    "RESOLVED",
                                    "REJECTED",
                                    "CANCELLED",
                                  ].includes(e.status) &&
                                    (0, s.jsx)("span", {
                                      className:
                                        "text-xs text-slate-400 font-medium",
                                      children: "No Pending Action",
                                    }),
                                ],
                              }),
                            ],
                          },
                          e.id,
                        );
                      })),
                (y[4] = k),
                (y[5] = q),
                (y[6] = p),
                (y[7] = x))
              : (x = y[7]),
            y[8] !== x
              ? ((v = (0, s.jsx)(d.Card, {
                  children: (0, s.jsx)(d.CardContent, {
                    className: "p-0",
                    children: (0, s.jsxs)(r.Table, {
                      children: [u, (0, s.jsx)(r.TableBody, { children: x })],
                    }),
                  }),
                })),
                (y[8] = x),
                (y[9] = v))
              : (v = y[9]),
            v
          );
        },
      ],
      88692,
    );
  },
  87486,
  (e) => {
    "use strict";
    var s = e.i(932),
      t = e.i(76782),
      a = e.i(11825),
      r = e.i(25913),
      i = e.i(79862);
    let l = (0, r.cva)(
      "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
      {
        variants: {
          variant: {
            default:
              "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
            secondary:
              "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
            destructive:
              "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
            outline:
              "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
            ghost:
              "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
            link: "text-primary underline-offset-4 hover:underline",
          },
        },
        defaultVariants: { variant: "default" },
      },
    );
    e.s([
      "Badge",
      0,
      function (e) {
        let r,
          d,
          c,
          n,
          o,
          u,
          m,
          x = (0, s.c)(13);
        if (x[0] !== e) {
          let { className: s, variant: u, render: m, ...h } = e;
          ((r = m),
            (o = void 0 === u ? "default" : u),
            (n = a.useRender),
            (d = "span"),
            (c = (0, t.mergeProps)(
              { className: (0, i.cn)(l({ variant: o }), s) },
              h,
            )),
            (x[0] = e),
            (x[1] = r),
            (x[2] = d),
            (x[3] = c),
            (x[4] = n),
            (x[5] = o));
        } else ((r = x[1]), (d = x[2]), (c = x[3]), (n = x[4]), (o = x[5]));
        return (
          x[6] !== o
            ? ((u = { slot: "badge", variant: o }), (x[6] = o), (x[7] = u))
            : (u = x[7]),
          x[8] !== r || x[9] !== d || x[10] !== c || x[11] !== u
            ? ((m = { defaultTagName: d, props: c, render: r, state: u }),
              (x[8] = r),
              (x[9] = d),
              (x[10] = c),
              (x[11] = u),
              (x[12] = m))
            : (m = x[12]),
          n(m)
        );
      },
    ]);
  },
  15288,
  (e) => {
    "use strict";
    var s = e.i(43476),
      t = e.i(932),
      a = e.i(79862);
    e.s([
      "Card",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c,
          n = (0, t.c)(10);
        n[0] !== e
          ? (({ className: r, size: l, ...i } = e),
            (n[0] = e),
            (n[1] = r),
            (n[2] = i),
            (n[3] = l))
          : ((r = n[1]), (i = n[2]), (l = n[3]));
        let o = void 0 === l ? "default" : l;
        return (
          n[4] !== r
            ? ((d = (0, a.cn)(
                "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
                r,
              )),
              (n[4] = r),
              (n[5] = d))
            : (d = n[5]),
          n[6] !== i || n[7] !== o || n[8] !== d
            ? ((c = (0, s.jsx)("div", {
                "data-slot": "card",
                "data-size": o,
                className: d,
                ...i,
              })),
              (n[6] = i),
              (n[7] = o),
              (n[8] = d),
              (n[9] = c))
            : (c = n[9]),
          c
        );
      },
      "CardContent",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)("px-(--card-spacing)", r)),
              (c[3] = r),
              (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("div", {
                "data-slot": "card-content",
                className: l,
                ...i,
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
      "CardDescription",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)("text-sm text-muted-foreground", r)),
              (c[3] = r),
              (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("div", {
                "data-slot": "card-description",
                className: l,
                ...i,
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
      "CardFooter",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)(
                "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
                r,
              )),
              (c[3] = r),
              (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("div", {
                "data-slot": "card-footer",
                className: l,
                ...i,
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
      "CardHeader",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)(
                "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
                r,
              )),
              (c[3] = r),
              (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("div", {
                "data-slot": "card-header",
                className: l,
                ...i,
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
      "CardTitle",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)(
                "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
                r,
              )),
              (c[3] = r),
              (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("div", {
                "data-slot": "card-title",
                className: l,
                ...i,
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
    ]);
  },
  84774,
  (e) => {
    "use strict";
    var s = e.i(43476),
      t = e.i(932),
      a = e.i(79862);
    e.s([
      "Table",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)("w-full caption-bottom text-sm", r)),
              (c[3] = r),
              (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("div", {
                "data-slot": "table-container",
                className: "relative w-full overflow-x-auto",
                children: (0, s.jsx)("table", {
                  "data-slot": "table",
                  className: l,
                  ...i,
                }),
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
      "TableBody",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)("[&_tr:last-child]:border-0", r)),
              (c[3] = r),
              (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("tbody", {
                "data-slot": "table-body",
                className: l,
                ...i,
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
      "TableCell",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)(
                "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
                r,
              )),
              (c[3] = r),
              (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("td", {
                "data-slot": "table-cell",
                className: l,
                ...i,
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
      "TableHead",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)(
                "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
                r,
              )),
              (c[3] = r),
              (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("th", {
                "data-slot": "table-head",
                className: l,
                ...i,
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
      "TableHeader",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)("[&_tr]:border-b", r)), (c[3] = r), (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("thead", {
                "data-slot": "table-header",
                className: l,
                ...i,
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
      "TableRow",
      0,
      function (e) {
        let r,
          i,
          l,
          d,
          c = (0, t.c)(8);
        return (
          c[0] !== e
            ? (({ className: r, ...i } = e), (c[0] = e), (c[1] = r), (c[2] = i))
            : ((r = c[1]), (i = c[2])),
          c[3] !== r
            ? ((l = (0, a.cn)(
                "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
                r,
              )),
              (c[3] = r),
              (c[4] = l))
            : (l = c[4]),
          c[5] !== i || c[6] !== l
            ? ((d = (0, s.jsx)("tr", {
                "data-slot": "table-row",
                className: l,
                ...i,
              })),
              (c[5] = i),
              (c[6] = l),
              (c[7] = d))
            : (d = c[7]),
          d
        );
      },
    ]);
  },
  38580,
  (e) => {
    "use strict";
    var s = e.i(932),
      t = e.i(54616),
      a = e.i(66027),
      r = e.i(12598),
      i = e.i(15383);
    let l = async (e) => {
        let s = new URLSearchParams();
        return (
          e &&
            Object.entries(e).forEach(([e, t]) => {
              void 0 !== t && "" !== t && null !== t && s.append(e, String(t));
            }),
          await (0, i.default)(`/service-request?${s.toString()}`, {
            method: "GET",
          })
        );
      },
      d = async (e) =>
        await (0, i.default)("/service-request", { method: "POST", body: e }),
      c = async (e) => {
        let s = new URLSearchParams();
        e &&
          Object.entries(e).forEach(([e, t]) => {
            void 0 !== t && "" !== t && null !== t && s.append(e, String(t));
          });
        let t = s.toString();
        return await (0, i.default)(
          `/service-request/my-requests${t ? `?${t}` : ""}`,
          { method: "GET" },
        );
      },
      n = async (e) =>
        await (0, i.default)(`/service-request/${e}`, { method: "GET" }),
      o = async (e) =>
        await (0, i.default)(`/service-request/${e}`, { method: "DELETE" }),
      u = async ({ id: e, status: s }) =>
        await (0, i.default)(`/service-request/${e}/status`, {
          method: "PATCH",
          body: { status: s },
        }),
      m = async () =>
        await (0, i.default)("/service-request/my-assigned", { method: "GET" }),
      x = async ({ requestId: e, status: s, remarks: t }) =>
        await (0, i.default)(`/service-request/${e}/status`, {
          method: "PATCH",
          body: { status: s, remarks: t },
        });
    function h(e) {
      return d(e);
    }
    function f(e) {
      return "my-requests" === e.queryKey[0];
    }
    function b(e) {
      return "service-requests" === e.queryKey[0];
    }
    e.s(
      [
        "useCreateServiceRequest",
        0,
        () => {
          let e,
            a = (0, s.c)(2),
            i = (0, r.useQueryClient)();
          return (
            a[0] !== i
              ? ((e = {
                  mutationFn: h,
                  onSuccess: () => {
                    (i.invalidateQueries({ queryKey: ["service-requests"] }),
                      i.invalidateQueries({ queryKey: ["my-requests"] }));
                  },
                }),
                (a[0] = i),
                (a[1] = e))
              : (e = a[1]),
            (0, t.useMutation)(e)
          );
        },
        "useDeleteServiceRequest",
        0,
        () => {
          let e,
            a = (0, s.c)(2),
            i = (0, r.useQueryClient)();
          return (
            a[0] !== i
              ? ((e = {
                  mutationFn: o,
                  onSuccess: () => {
                    (i.invalidateQueries({ predicate: f }),
                      i.invalidateQueries({ predicate: b }));
                  },
                }),
                (a[0] = i),
                (a[1] = e))
              : (e = a[1]),
            (0, t.useMutation)(e)
          );
        },
        "useGetAllServiceRequests",
        0,
        (e) => {
          let t,
            r = (0, s.c)(2);
          return (
            r[0] !== e
              ? ((t = {
                  queryKey: ["service-requests", e],
                  queryFn: () => l(e),
                  staleTime: 3e5,
                }),
                (r[0] = e),
                (r[1] = t))
              : (t = r[1]),
            (0, a.useQuery)(t)
          );
        },
        "useGetMyRequests",
        0,
        (e) => {
          let t,
            r = (0, s.c)(2);
          return (
            r[0] !== e
              ? ((t = { queryKey: ["my-requests", e], queryFn: () => c(e) }),
                (r[0] = e),
                (r[1] = t))
              : (t = r[1]),
            (0, a.useQuery)(t)
          );
        },
        "useGetSingleServiceRequest",
        0,
        (e) => {
          let t,
            r,
            i,
            l = (0, s.c)(7);
          l[0] !== e
            ? ((t = ["service-request", e]),
              (r = () => n(e)),
              (l[0] = e),
              (l[1] = t),
              (l[2] = r))
            : ((t = l[1]), (r = l[2]));
          let d = !!e;
          return (
            l[3] !== t || l[4] !== r || l[5] !== d
              ? ((i = { queryKey: t, queryFn: r, enabled: d }),
                (l[3] = t),
                (l[4] = r),
                (l[5] = d),
                (l[6] = i))
              : (i = l[6]),
            (0, a.useQuery)(i)
          );
        },
        "useGetStaffAssignedRequests",
        0,
        () => {
          let e,
            t = (0, s.c)(1);
          return (
            t[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = {
                  queryKey: ["staff-assigned-requests"],
                  queryFn: m,
                  staleTime: 18e4,
                }),
                (t[0] = e))
              : (e = t[0]),
            (0, a.useQuery)(e)
          );
        },
        "useUpdateServiceRequestStatus",
        0,
        () => {
          let e,
            a = (0, s.c)(2),
            i = (0, r.useQueryClient)();
          return (
            a[0] !== i
              ? ((e = {
                  mutationFn: u,
                  onSuccess: (e, s) => {
                    (i.invalidateQueries({ queryKey: ["my-requests"] }),
                      i.invalidateQueries({ queryKey: ["service-requests"] }),
                      i.invalidateQueries({ queryKey: ["available-staff"] }),
                      s?.id &&
                        i.invalidateQueries({
                          queryKey: ["service-request", s.id],
                        }));
                  },
                }),
                (a[0] = i),
                (a[1] = e))
              : (e = a[1]),
            (0, t.useMutation)(e)
          );
        },
        "useUpdateStaffRequestStatus",
        0,
        () => {
          let e,
            a = (0, s.c)(2),
            i = (0, r.useQueryClient)();
          return (
            a[0] !== i
              ? ((e = {
                  mutationFn: x,
                  onSuccess: () => {
                    (i.invalidateQueries({
                      queryKey: ["staff-assigned-requests"],
                    }),
                      i.invalidateQueries({ queryKey: ["service-requests"] }));
                  },
                }),
                (a[0] = i),
                (a[1] = e))
              : (e = a[1]),
            (0, t.useMutation)(e)
          );
        },
      ],
      38580,
    );
  },
  94517,
  (e) => {
    "use strict";
    var s = e.i(932),
      t = e.i(15383);
    let a = async () => await (0, t.default)("/staff/available-staff"),
      r = async ({ id: e, assignedStaffId: s }) =>
        await (0, t.default)(`/service-request/${e}/assign`, {
          method: "PATCH",
          body: { assignedStaffId: s, status: "ASSIGNED" },
        }),
      i = async () =>
        await (0, t.default)("/staff/dashboard-stats", { method: "GET" });
    var l = e.i(54616),
      d = e.i(66027),
      c = e.i(12598);
    function n() {
      return a();
    }
    function o() {
      return i();
    }
    e.s(
      [
        "useAssignStaff",
        0,
        () => {
          let e,
            t = (0, s.c)(2),
            a = (0, c.useQueryClient)();
          return (
            t[0] !== a
              ? ((e = {
                  mutationFn: r,
                  onSuccess: (e, s) => {
                    (a.invalidateQueries({ queryKey: ["my-requests"] }),
                      a.invalidateQueries({ queryKey: ["service-requests"] }),
                      a.invalidateQueries({ queryKey: ["available-staff"] }),
                      s?.id &&
                        a.invalidateQueries({
                          queryKey: ["service-request", s.id],
                        }));
                  },
                }),
                (t[0] = a),
                (t[1] = e))
              : (e = t[1]),
            (0, l.useMutation)(e)
          );
        },
        "useGetAvailableStaffs",
        0,
        () => {
          let e,
            t = (0, s.c)(1);
          return (
            t[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = { queryKey: ["available-staff"], queryFn: n }),
                (t[0] = e))
              : (e = t[0]),
            (0, d.useQuery)(e)
          );
        },
        "useGetStaffDashboardStats",
        0,
        () => {
          let e,
            t = (0, s.c)(1);
          return (
            t[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = { queryKey: ["staff-dashboard-stats"], queryFn: o }),
                (t[0] = e))
              : (e = t[0]),
            (0, d.useQuery)(e)
          );
        },
      ],
      94517,
    );
  },
]);
