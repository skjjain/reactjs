import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import { useSelector } from "react-redux";

// routes config
import routes from "../routes";
import { ProtectedRoute } from "../casl/can";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  const loginStatus = useSelector((state) => state.EmployeeReducer.loginStatus);

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <ProtectedRoute path={route.path}>
                          <route.component {...props} />
                        </ProtectedRoute>
                      </CFade>
                    )}
                  />
                )
              );
            })}
            {loginStatus && loginStatus.role !== 2 ? (
              <Redirect from="/" to="/employees" />
            ) : (
              <Redirect from="/" to="/reviews" />
            )}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
