import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Auth
import Login from "./pages/Login";

// Owner App (Salon Owner Dashboard)
import Appointments from "./pages/Appointments";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import History from "./pages/History";
import Services from "./pages/Services";
import Stylists from "./pages/Stylists";
import Packages from "./pages/Packages";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Chat from "./pages/Chat";
import Slots from "./pages/Slots";
import Profile from "./pages/Profile";

// User App (Customer-facing)
import UserHome from "./pages/user/UserHome";
import UserServices from "./pages/user/UserServices";
import UserBooking from "./pages/user/UserBooking";
import UserAppointments from "./pages/user/UserAppointments";
import UserCart from "./pages/user/UserCart";
import UserAccount from "./pages/user/UserAccount";

// Admin Panel (Super Admin)
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSalons from "./pages/admin/AdminSalons";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminGeneric from "./pages/admin/AdminGeneric";

// Marketing Website
import WebsiteHome from "./pages/website/WebsiteHome";
import WebsiteAbout from "./pages/website/WebsiteAbout";
import WebsiteBlog from "./pages/website/WebsiteBlog";
import WebsiteContact from "./pages/website/WebsiteContact";
import WebsiteFAQ from "./pages/website/WebsiteFAQ";
import WebsiteFreelancers from "./pages/website/WebsiteFreelancers";
import WebsiteSalons from "./pages/website/WebsiteSalons";
import WebsiteShop from "./pages/website/WebsiteShop";
import WebsiteServices from "./pages/website/WebsiteServices";

function Router() {
  return (
    <Switch>
      {/* Default: redirect to marketing website */}
      <Route path="/" component={WebsiteHome} />

      {/* Auth */}
      <Route path="/login" component={Login} />

      {/* ── Owner App ── */}
      <Route path="/appointments" component={Appointments} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/history" component={History} />
      <Route path="/services" component={Services} />
      <Route path="/stylists" component={Stylists} />
      <Route path="/packages" component={Packages} />
      <Route path="/products" component={Products} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/chat" component={Chat} />
      <Route path="/slots" component={Slots} />
      <Route path="/profile" component={Profile} />

      {/* ── User App ── */}
      <Route path="/user/home" component={UserHome} />
      <Route path="/user/services" component={UserServices} />
      <Route path="/user/booking" component={UserBooking} />
      <Route path="/user/appointments" component={UserAppointments} />
      <Route path="/user/cart" component={UserCart} />
      <Route path="/user/account" component={UserAccount} />
      {/* Catch-all for user sub-routes */}
      <Route path="/user/:rest*">
        {(params) => <UserAccount />}
      </Route>

      {/* ── Admin Panel ── */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/salons" component={AdminSalons} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/appointments" component={AdminAppointments} />
      <Route path="/admin/analytics">
        {() => <AdminGeneric title="Analytics" description="Platform-wide analytics and reporting" />}
      </Route>
      <Route path="/admin/freelancers">
        {() => <AdminGeneric title="Freelancers" description="Manage freelance stylists on the platform" />}
      </Route>
      <Route path="/admin/orders">
        {() => <AdminGeneric title="Orders" description="Manage product orders and fulfillment" />}
      </Route>
      <Route path="/admin/products">
        {() => <AdminGeneric title="Products" description="Manage the beauty product catalog" />}
      </Route>
      <Route path="/admin/payments">
        {() => <AdminGeneric title="Payments" description="Transaction history and payment management" />}
      </Route>
      <Route path="/admin/subscriptions">
        {() => <AdminGeneric title="Subscriptions" description="Manage salon subscription plans" />}
      </Route>
      <Route path="/admin/categories">
        {() => <AdminGeneric title="Categories" description="Manage service and product categories" />}
      </Route>
      <Route path="/admin/banners">
        {() => <AdminGeneric title="Banners" description="Manage promotional banners and ads" />}
      </Route>
      <Route path="/admin/blogs">
        {() => <AdminGeneric title="Blogs" description="Manage blog posts and content" />}
      </Route>
      <Route path="/admin/cities">
        {() => <AdminGeneric title="Cities" description="Manage supported cities and regions" />}
      </Route>
      <Route path="/admin/complaints">
        {() => <AdminGeneric title="Complaints" description="Handle customer complaints and disputes" />}
      </Route>
      <Route path="/admin/reviews">
        {() => <AdminGeneric title="Reviews" description="Moderate platform reviews and ratings" />}
      </Route>
      <Route path="/admin/referrals">
        {() => <AdminGeneric title="Referrals" description="Manage referral programs and rewards" />}
      </Route>
      <Route path="/admin/notifications">
        {() => <AdminGeneric title="Notifications" description="Send push notifications to users" />}
      </Route>
      <Route path="/admin/administrators">
        {() => <AdminGeneric title="Administrators" description="Manage admin accounts and permissions" />}
      </Route>
      <Route path="/admin/settings">
        {() => <AdminGeneric title="Settings" description="Platform configuration and settings" />}
      </Route>

      {/* ── Marketing Website ── */}
      <Route path="/website" component={WebsiteHome} />
      <Route path="/website/about" component={WebsiteAbout} />
      <Route path="/website/blog" component={WebsiteBlog} />
      <Route path="/website/contact" component={WebsiteContact} />
      <Route path="/website/faq" component={WebsiteFAQ} />
      <Route path="/website/freelancers" component={WebsiteFreelancers} />
      <Route path="/website/salons" component={WebsiteSalons} />
      <Route path="/website/shop" component={WebsiteShop} />
      <Route path="/website/services" component={WebsiteServices} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
