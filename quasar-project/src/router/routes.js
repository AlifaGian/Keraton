import SignIn from "../pages/SignIn.vue";
import SignUp from "../pages/SignUp.vue";
import SejarahLP from "../pages/SejarahKeraton.vue";
import HistoryTransaksi from "../pages/HistoryTransaksi.vue";
import AfterCheckoutViews from "../pages/AfterCheckoutViews.vue";
import Beritaterkini from "../pages/BeritaTerkini.vue";
import AreaKeraton from "../pages/AreaKeraton.vue";
import Museum from "../pages/MuseumPage.vue";
import CheckoutKeraton from "../pages/CheckoutKeraton.vue";
import PilihanPaket from "../pages/PilihanPaket.vue";
import BeranDa from "../pages/BeranDa.vue";
import EventGratis from "../pages/EventGratis.vue";
import Booking from "../pages/BookingPage.vue";
import FilterBayar from "../pages/FilterBayar.vue";
import AgungDalem from "../pages/AgungDalem.vue";
import sejarahSilsilah from "../pages/sejarahSilsilah.vue";
import silsilahDesktop from "../pages/silsilahDesktop.vue";
import AdminHomePage from "../pages/Admin/HomePage.vue";
import AdminAddPage from "../pages/Admin/AddPage.vue";
import NyobaAdmin from "../pages/nyobaAdmin.vue";
import Cart from "../pages/CartPage.vue";
import Template from "../pages/TicketTemplate.vue";
import Berita from "../pages/BeritaTerkini.vue";

const routes = [
  {
    path: "/admin/home",
    name: "AdminHomePage",
    component: AdminHomePage,
    meta: {
      preventToken: true
    }
  },
  {
    path: "/admin/add/:id",
    name: "AdminAddPage",
    component: AdminAddPage,
    meta: {
      preventToken: true
    }
  },
  {
    path: "/admin/event",
    name: "AdminEventPage",
    component: AdminEventPage,
    meta: {
      preventToken: true
    }
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/sejarah",
    name: "sejarah",
    component: SejarahLP,
  },
  {
    path: "/wisata/keraton",
    name: "areakeraton",
    component: AreaKeraton,
  },
  {
    path: "/wisata/museum",
    name: "museum",
    component: Museum,
  },
  {
    path: "/user/checkout",
    name: "checkout",
    component: CheckoutKeraton,
    meta: {
      preventToken: true
    }
  },
  {
    path: "/pilihanpaket",
    name: "pilihanpaket",
    component: PilihanPaket,
  },
  {
    path: "/",
    name: "beranda",
    component: BeranDa,
  },
  {
    path: "/user/transaction",
    name: "historytransaksi",
    component: HistoryTransaksi,
    meta: {
      preventToken: true
    }
  },
  {
    path: "/aftercheckout",
    name: "aftercheckout",
    component: AfterCheckoutViews,
  },
  {
    path: "/booking/events",
    name: "eventgratis",
    component: EventGratis
  },
  {
    path: "/booking",
    name: "booking",
    component: Booking
  },
  {
    path: "/filterbayar",
    name: "filterbayar",
    component: FilterBayar,
  },
  {
    path: "/wisata/dalemagung",
    name: "agungdalem",
    component: AgungDalem,
  },
  {
    path: "/sejarah/silsilah",
    name: "sejarahsilsilah",
    component: sejarahSilsilah,
  },
  {
    path: "/silsilahdesktop",
    name: "silsilahktop",
    component: silsilahDesktop,
  },
  {
    path: "/nyobaAdmin",
    name: "nyobaAdmin",
    component: NyobaAdmin,
  },
  {
    path: "/user/carts",
    name: "Cart",
    component: Cart,
    meta: {
      preventToken: true
    }
  },
  {
    path: "/template",
    name: "Template",
    component: Template,
  },
  {
    path: "/beritaterkini",
    name: "Beritaterkini",
    component: Beritaterkini,
  },
];

export default routes;
