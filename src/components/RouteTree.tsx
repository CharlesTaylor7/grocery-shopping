import Index from "@/pages/index.tsx";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import PasswordReset from "@/pages/auth/password-reset";
import Version from "@/pages/Version";
import Store from "@/pages/store/Store";
import StoreList from "@/pages/store-list/StoreList";
import Trip from "@/pages/trip";
import TripList from "@/pages/trip/[id].tsx";
import Nav from "@/pages/nav.tsx";
import AuthGuard from "@/components/AuthGuard";
import { Redirect, Route, Switch } from "wouter";

export default function RouteTree() {
  return <>
    <Route path="/" component={Index} />
    <Route path="nav" component={Nav} />
    <Route path="version" component={Version} />


    <Route nest path="auth" >
      <Route path="/" >
        <Redirect to="/login" />
      </Route>
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="password-reset" component={PasswordReset} />
    </Route>

    <AuthGuard>
      <Switch>
        <Route path="/store/:id" component={Store} />
        <Route path="/store" component={StoreList} />
      </Switch>
      <Switch>
        <Route path="/trip/:id" component={Trip} />
        <Route path="/trip" component={TripList} />
      </Switch>
    </AuthGuard>
  </>
}

