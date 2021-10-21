import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/home/HomePage";
import Contact from "./components/contact/Contact";
import Hotels from "./components/hotels/Hotels";
import LoginPage from "./components/login/LoginPage";
import Header from "./components/layout/Header";
import Container from 'react-bootstrap/Container'
import ViewHotel from "./components/details/ViewHotel";
import AdminPage from "./components/admin/AdminPage";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faFacebook, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faFacebook, faTwitter, faInstagram, faFontAwesome)

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header />
      <Container fluid>
        <Row>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/admin" exact>
							<AdminPage />
						</Route>
            <Route path="/hotels">
              <Hotels />
            </Route>
            <Route path="/details/:id">
              <ViewHotel />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
          </Row>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
