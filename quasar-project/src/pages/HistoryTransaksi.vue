<script setup>
import { ref, computed } from "vue";
import { defineProps, defineExpose } from "vue";
import NavBar from "../components/NavBar.vue";
import PaymentPopup from "../components/PaymentPopup.vue";
import PaymentDropdown from "../components/PaymentDropdown.vue";
import AfterCheckoutViews from "../pages/AfterCheckoutViews.vue";

const searchQuery = ref("");
const detail = ref(false);
const cara = ref(false);
const selectedStatus = ref(""); // Set default value to empty string
const statusSelected = ref(false);
const { totalPayment } = defineProps(["totalPayment"]);
const virtualAccount = ref(8883123456789012);
const { paymentPopup } = AfterCheckoutViews;

const showPopup = ref(false);

const showPaymentPopup = () => {
  showPopup.value = true;
};

const openDetailTransaksi = () => {
  detail.value = !detail.value;
};

const closeDetailTransaksi = () => {
  detail.value = false;
};

const openMenungguPembayaran = () => {
  cara.value = !cara.value;
  showPaymentPopup();
};

const closeMenungguPembayaran = () => {
  cara.value = false;
};

const openAfterCheckout = () => {
  const toaftercheckout = "/#/aftercheckout";
  window.open(toaftercheckout, "_blank");
};

const transactions = [
  {
    status: "sudahDigunakan",
    label: "Sudah digunakan",
    class: "sudah__digunakan",
    cardClass: "card-1",
    popup: "sudahdigunakan",
    value: "1",
    actions: [
      { detail: "Lihat detail transaksi", handler: openDetailTransaksi },
      { label: "|" },
      { label: "Bantuan", handler: null }, // Handler bisa diisi sesuai kebutuhan
    ],
  },
  {
    status: "dapatDigunakan",
    label: "Dapat digunakan",
    class: "dapat__digunakan",
    cardClass: "card-2",
    popup: "dapatdigunakan",
    value: "2",
    actions: [
      { detail: "Lihat detail transaksi", handler: openDetailTransaksi },
      { label: "|" },
      { label: "Bantuan", handler: null }, // Handler bisa diisi sesuai kebutuhan
    ],
  },
  {
    status: "expired",
    label: "Expired",
    class: "expired",
    cardClass: "card-3",
    popup: "expired",
    value: "3",
    actions: [
      { detail: "Lihat detail transaksi", handler: openDetailTransaksi },
      { label: "|" },
      { label: "Bantuan", handler: null },
    ],
  },
  {
    status: "menungguPembayaran",
    label: "Menunggu pembayaran",
    class: "menunggu__pembayaran",
    cardClass: "card-4",
    value: "4",
    actions: [
      {
        detail: "Lihat detail",
        handler: openAfterCheckout, // Menggunakan path rute
      },
      { label: "|" },
      { label: "Cara Pembayaran", handler: openMenungguPembayaran },
    ],
  },
];

const condition = (transactions) => {
  let stats = ""; // Menggunakan let agar bisa diubah
  switch (transactions.label) {
    case "sudah__digunakan":
      stats = "Sudah digunakan";
      break;
    case "dapat__digunakan":
      stats = "Dapat digunakan";
      break;
    case "expired":
      stats = "Expired";
      break;
    default:
      stats = "default";
      break;
  }
  return stats; // Mengembalikan hasil
};

const currentTransaction = computed(() => {
  if (!selectedStatus.value) {
    return transactions;
  }
  return transactions.filter(
    (transaction) => transaction.status === selectedStatus.value
  );
});

const copyContent = (content) => {
  if (content === "copyVirtualAccount") {
    navigator.clipboard
      .writeText(virtualAccount.value)
      .then(() => {
        console.log("Konten berhasil disalin!");
      })
      .catch((err) => {
        console.error("Gagal menyalin konten:", err);
      });
  } else {
    navigator.clipboard
      .writeText(totalPayment.trim())
      .then(() => {
        console.log("Konten berhasil disalin!");
      })
      .catch((err) => {
        console.error("Gagal menyalin konten:", err);
      });
  }
};

const displayedVirtualAccount = computed(() => {
  const virtualAccountString = virtualAccount.value.toString();
  const firstDigits = virtualAccountString.substring(0, 4);
  return firstDigits + "xxxxxxxx";
});

defineExpose({
  showPaymentPopup,
  displayedVirtualAccount,
});
</script>
<script>
export default {
  data() {
    return {
      isOpen: false,
      options: [
        { label: "Sudah digunakan", value: "sudahDigunakan" },
        { label: "Dapat digunakan", value: "dapatDigunakan" },
        { label: "Expired", value: "expired" },
        { label: "Menunggu pembayaran", value: "menungguPembayaran" },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
<template>
  <div class="all-content">
    <div>
      <nav class="navbar">
        <NavBar />
      </nav>
      <div class="content">
        <div>
          <div class="title">History transaksi</div>
        </div>
        <div class="container">
          <div class="form-input">
            <div class="search">
              <label for="search" class="search-label">
                <img src="../assets/svg/search.svg" class="search-icon" />
                <input
                  type="search"
                  v-model="searchQuery"
                  id="search"
                  name="search"
                  placeholder="Cari transaksi"
                  class="Pencarian"
                />
              </label>
            </div>
            <div class="date">
              <input
                value="Pilih tanggal"
                type="date"
                class="tanggal"
                placeholder="Pilih tanggal"
              />
            </div>
            <div class="status">
              <select
                name="Status"
                placeholder="status"
                v-model="selectedStatus"
                @change="statusSelected = true"
                class="custom-select"
              >
                <option value="">Status</option>
                <option
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="tabel">
        <div
          v-for="transaction in currentTransaction"
          :key="transaction.status"
          :class="transaction.cardClass"
          class="tiket"
        >
          <div class="tikets">
            <div class="tiket__header-container">
              <img
                src="../assets/images/Vector.png"
                alt="icon-tiket"
                class="icon-tiket"
              />
              <div class="tiket-txt">Tiket</div>
              <div class="waktu-txt">17 Agu 2023</div>
              <p :class="transaction.class">{{ transaction.label }}</p>
            </div>
            <div class="tiket__content">
              <img src="../assets/images/img-1.jpg" alt="" />
              <div class="tiket__content-details">
                <div class="info-detail-tiket-namaTiket">
                  Tiket Masuk Keraton Kasepuhan Cirebon+Museum+Dalem Agung
                  Pakungwati
                </div>
                <div class="label">
                  <div class="labelharga">1 tiket x Rp. 10.000</div>
                  <div class="labelharga">+2 tiket lainnya</div>
                </div>
                <div class="total">
                  <div class="info">
                    <div class="total__belanja">Total belanja</div>
                    <div class="hrga">Rp. 33.500</div>
                  </div>
                  <div class="actions">
                    <a
                      v-for="(action, index) in transaction.actions"
                      :key="index"
                      @click="action.handler"
                      class="detail"
                    >
                      <div class="bantu">
                        <div class="detail">{{ action.detail }}</div>
                        {{ action.label }}
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- popup -->

      <section class="detail-transaksi" v-if="detail">
        <div class="popup">
          <div class="popup-content">
            <div class="header">
              <div class="p">Detail Transaksi</div>
              <span class="close" @click="closeDetailTransaksi"
                ><img src="../assets/images/close.png" class="Icon"
              /></span>
            </div>
            <div class="isi">
              <small class="sudah__digunakan">{{
                condition(transactions)
              }}</small>
              <div class="info__details">
                <div class="flex-container">
                  <div>
                    <div class="flex-container">No. Transaksi</div>
                    <div class="flex-container">
                      INV/20230817/MPL/3721648145
                    </div>
                  </div>
                  <div>
                    <div class="flex-container">Tanggal Pembelian</div>
                    <div class="flex-container">15 Agustus 2023, 10:00 WIB</div>
                  </div>
                </div>
                <div class="detailtiket">Detail tiket</div>
                <div class="detail-tiket">
                  <img src="../assets/svg/gambarKraton.svg" alt="" />
                  <div class="info-detail-tiket">
                    <div class="info-detail-tiket-namaTiket-pp">
                      Tiket Masuk Keraton Kasepuhan (UMUM)
                    </div>
                    <div class="waktu">17 Agu 2023; 10:00;</div>
                    <div class="harga">1 x Rp. 10.000</div>
                  </div>
                </div>
                <div class="all-tiket">
                  <small>
                    Lihat semua tiket
                    <img src="../assets/svg/panahBawah.svg" alt="" />
                  </small>
                </div>
                <div class="info-pembayaran">Info pembayaran</div>
                <div class="status-pembayaran">
                  <div class="status-pembayaran">Status pembayaran</div>
                  <div class="small">Berhasil</div>
                </div>
                <div class="pemesan">
                  <div class="pemesan-txt">Pemesan</div>
                  <div class="pemesan-usn">
                    John Doe
                    <div class="pemesan-email">/johndoe@keraton.com</div>
                  </div>
                </div>
                <div class="metode-pembayaran">
                  <div class="metode-pembayaran-txt">Metode Pembayaran</div>
                  <div class="metode-pembayaran-bank">BJB Virtual Account</div>
                </div>
                <div class="total-harga">
                  <div class="total-harga-txt">Total Harga(3 Tiket)</div>
                  <div class="total-harga-total">Rp. 30.000</div>
                </div>
                <div class="biaya-layanan">
                  <div class="biaya-layanan-txt">Biaya Layanan</div>
                  <div class="biaya-layanan-harga">Rp. 3.500</div>
                </div>
                <div class="line"></div>
                <div class="total-biaya">
                  <div class="total-biaya-txt">Total Biaya</div>
                  <div class="total-biaya-total">Rp. 33.500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- <section class="detail-transaksi" v-if="detail">
        <div class="popup">
            <div class="popup-content">
              <div class="header">
                <h1 class="p">Detail Transaksi</h1>
                <span class="close" @click="closeDetailTransaksi"><img src="../assets/images/close.png" class="Icon"></span>
                </div>
                <div class="isi">
                <small class="label-card1">Sudah digunakan</small>
                <div class="info__details">
                  <div class="flex-container">
                    <div>
                      <h6>No. Transaksi</h6>
                      <p>INV/20230817/MPL/3721648145</p>
                    </div>
                    <div>
                      <h6>Tanggal Pembelian</h6>
                      <p>15 Agustus 2023, 10:00 WIB</p>
                    </div>
                  </div>
                  <h6 class="detailtiket">Detail tiket</h6>
                  <div class="detail-tiket">
                  <img src="../assets/svg/gambarKraton.svg" alt="">
                  <div class="info-detail-tiket">
                    <p>Tiket Masuk Keraton Kasepuhan (UMUM)</p>
                    <label class="harga">17 Agu 2023; 10:00; </label>
                    <label class="harga">1 x Rp. 10.000</label>
                </div>
              </div>
              <div class="all-tiket">
              <small>Lihat semua tiket  <img src="../assets/svg/panahBawah.svg" alt="" ></small>
              </div>
              <h6 class="info-pembayaran">Info pembayaran</h6>
              <div class="status-pembayaran">
                <h6>Status pembayaran</h6>
                <small>Berhasil</small>
              </div>
              <div class="pemesan">
                <h6>Pemesan</h6>
                <p>John Doe<label>/johndoe@keraton.com</label></p>
              </div>
              <div class="metode-pmbayaran">
                <h6>Metode Pembayaran</h6>
                <p>BJB Virtual Account</p>
              </div>
              <div class="total-harga-3-Tiket">
                <h6>Total Harga(3 Tiket)</h6>
                <p>Rp. 30.000</p>
              </div>
              <div class="biaya-layanan">
                <h6>Biaya Layanan</h6>
                <p>Rp. 3.500</p>
              </div>
              <div class="line">

              </div>
              <div class="total-biaya">
                <h6>Total Biaya</h6>
                <p>Rp. 33.500</p>
              </div>
              </div>
            </div>
            </div>
        </div>
    </section> -->

      <section class="detail-transaksi" v-if="cara">
        <div class="popup">
          <div class="popup-content">
            <div class="header">
              <h1 class="p">Cara Pembayaran</h1>
              <span class="close" @click="closeMenungguPembayaran"
                ><img src="../assets/images/close.png" class="Icon"
              /></span>
            </div>
            <div class="isi">
              <PaymentPopup ref="paymentPopup" :totalPayment="totalPayment" />
              <div class="waiting-payment__content-data">
                <div class="waiting-payment__content-desc">
                  <p class="fs-h4">BJB Virtual Account</p>
                  <img :src="logoBJB" alt="logoBJB" />
                </div>
                <div class="waiting-payment__content-desc">
                  <div class="waiting-payment__content-sub fs-h5">
                    <p style="color: rgba(94, 94, 94, 1)">
                      Nomor Virtual Account
                    </p>
                    <p ref="copyVirtualAccount">
                      {{ displayedVirtualAccount }}
                    </p>
                  </div>
                  <span
                    class="waiting-payment__copy-desc"
                    @click="copyContent('copyVirtualAccount')"
                  >
                    Salin
                    <ph-clipboard-text :size="32" weight="bold" class="icon" />
                  </span>
                </div>

                <div class="waiting-payment__content-desc">
                  <div class="waiting-payment__content-sub fs-h5">
                    <p style="color: rgba(94, 94, 94, 1)">Total Pembayaran</p>
                    <p ref="copyTotalPayment">
                      Rp. <span>{{ totalPayment }}</span>
                    </p>
                  </div>
                  <span
                    class="waiting-payment__copy-desc"
                    @click="copyContent('copyTotalPayment')"
                  >
                    Salin
                    <ph-clipboard-text :size="32" weight="bold" class="icon" />
                  </span>
                </div>
                <div>
                  <PaymentDropdown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: cookieHandler.getCookie(env.TOKEN_STORAGE_NAME),
      historyDatas: ref([]),
      rawHistoryDatas: ref({}),
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$api.get("trans", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        if (response.status != 200) throw Error(response.data.message);
        for (let transaction of response.data.data) {
          let planDate = new Date(transaction.plannedDate);
          planDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(planDate);

          this.rawHistoryDatas[transaction.id] = transaction.detailTrans;
          this.historyDatas.push({
            ...this.simplifyDetail(transaction.detailTrans),
            ...this.simplifyStatus(transaction.status),
            date: planDate,
            total: transaction.total,
            // actions: [
            //   { label: "Lihat detail", handler:() },
            //   { label: "|" },
            //   { label: "Cara Pembayaran", handler: openMenungguPembayaran() },
            // ]
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    openDetailTransaksi(row) {
      detail.value = !detail.value;
    },
    simplifyDetail(detail) {
      let detailDatas = {
        length: 0,
        data: [],
      };
      for (let detailData of detail) {
        let contentToPush = {};
        if (detailData.order) {
          const orderData = detailData.order;
          (contentToPush["price"] = orderData.price),
            (contentToPush["quantity"] = detailData.amount);
          contentToPush["name"] = orderData.name;
          contentToPush["badgeColor"] = orderData.orderSubTypeId
            ? "blue"
            : "orange";
        } else {
          const eventData = detailData.event;
          (contentToPush["price"] = eventData.price),
            (contentToPush["quantity"] = detailData.amount);
          contentToPush["name"] = eventData.name;
          contentToPush["badgeColor"] = "green";
        }
        detailDatas.data.push(contentToPush);
      }
      detailDatas.length = detail.length;
      return { detailDatas };
    },
    simplifyStatus(status) {
      let dataToReturn = {};
      switch (status) {
        case "SUDAH_DIGUNAKAN":
          dataToReturn["status"] = "sudahDigunakan";
          dataToReturn["label"] = "Sudah Digunakan";
          dataToReturn["class"] = "sudah__digunakan";
          dataToReturn["cardClass"] = "card-1";
          break;
        case "DAPAT_DIGUNAKAN":
          dataToReturn["status"] = "dapatDigunakan";
          dataToReturn["label"] = "Dapat Digunakan";
          dataToReturn["class"] = "dapat__digunakan";
          dataToReturn["cardClass"] = "card-2";
          break;
        case "EXPIRED":
          dataToReturn["status"] = "expired";
          dataToReturn["label"] = "Expired";
          dataToReturn["class"] = "expired";
          dataToReturn["cardClass"] = "card-3";
          break;
        case "MENUNGGU_PEMBAYARAN":
          dataToReturn["status"] = "menungguPembayaran";
          dataToReturn["label"] = "Menunggu Pembayaran";
          dataToReturn["class"] = "menunggu__pembayaran";
          dataToReturn["cardClass"] = "card-4";
          break;
        default:
          break;
      }
      return dataToReturn;
    },
  },
  formatRupiah(price) {
    if (price === 0) return "Free";
    return (price / 1000).toLocaleString("en-US", {
      minimumFractionDigits: 3,
    });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap");

.bantu {
  color: #000000;
  font-weight: 500;
}

body {
  font-family: "Raleway", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
}

.all-content {
  font-family: raleway;
}

.content {
  padding-top: 10vh;
}

.title {
  padding-top: 3vw;
  text-align: center;
  color: #333;
  font-size: 2.4vw;
  font-weight: 700;
}

.Pencarian {
  width: 17vw; /* 400px */
  height: 5.556vh; /* 60px */
  padding: 1.389vh; /* 15px */
  border: 0.052vw solid #ddd; /* 1px */
  border-radius: 0.26vw; /* 5px */
  box-sizing: border-box;
  margin-bottom: 0.926vh; /* 10px */
}

.tanggal {
  width: 17vw; /* 402px */
  height: 5.556vh; /* 60px */
  padding: 1.481vh; /* 16px */
  border: 0.052vw solid #ddd; /* 1px */
  border-radius: 0.26vw; /* 5px */
  box-sizing: border-box;
  margin-bottom: 0.926vh; /* 10px */
}

select {
  width: 17vw; /* 384px */
  padding: 1.481vh; /* 16px */
  height: 5.556vh; /* 60px */
  border: 0.052vw solid #ddd; /* 1px */
  border-radius: 0.26vw; /* 5px */
  box-sizing: border-box;
  margin-bottom: 0.926vh; /* 10px */
  cursor: pointer;
}
.dropdown-toggle {
  width: 247px;
  padding: 12px;
  height: 48px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5vw;
}

.dropdown-toggle img {
  max-width: 1vw;
  transition: 0.3s ease;
}

.rotated {
  transform: rotate(180deg);
  transition: 0.3s ease;
}

.dropdown-menu {
  position: absolute;
  width: 17vw;
  /* height: 48px; */
  /* top: 274px; */
  border: 0.15vw solid #ddd;
  border-radius: 1vw;
  background-color: #ffffff;
  font-family: raleway;
  font-weight: 700;
  font-size: 0.9vw;
  line-height: 17.5px;
  text-align: left;
  padding-left: 0.3vw;
  padding-top: 0.5vw;
  cursor: pointer;
  z-index: 1;
}

.dropdown-menu option {
  font-weight: 700;
}

option {
  padding: 10px;
  background-color: #ffffff;
  color: #333;
}

option:hover {
  background-color: #ddd;
}

option:selected {
  font-weight: bold;
}

.Pencarian::placeholder,
.tanggal::placeholder,
.select::placeholder {
  color: #999;
  font-size: 1vw;
}

.tabel {
  width: 54vw; /* 779px */
  height: fit-content;
  margin-top: 3.5vw; /* 48px */
  padding: 0.52vw; /* 10px */
  margin-bottom: 1.197vw; /* 23px */
  justify-content: center;
  gap: 1.042vw; /* 20px */
  margin: auto;
}

.icon-tiket {
  margin-top: 0.32vw;
  margin-left: 1vw;
  width: 1.5vw;
  height: 1vw;
}

.form-input {
  display: flex;
  justify-content: center;
  gap: 1vw;
}

.container {
  text-align: center;
  margin-top: 5vw;
}

.tiket__header-container {
  display: flex;
  gap: 1vw;
  margin-top: 1vw;
}
.tikets {
  border-radius: 1vw;
  box-shadow: 0.3vw 0.3vw 0.3vw rgba(0.1, 0, 0, 0.15);
  margin-bottom: 1vw;
  padding-top: 0.1vw;
}

.tiket__content {
  display: flex;
  height: fit-content;
  border-radius: 0.625vw; /* 12px */
  margin: 0 auto; /* Mengatur margin horizontal secara otomatis untuk memusatkan */
  margin-bottom: 1.197vw; /* 23px */
  gap: 1.042vw; /* 20px */
}

.tiket-txt {
  font-size: 1.1vw;
  font-weight: 700;
  font: bold;
}

.waktu-txt {
  padding-left: -1vw;
  margin-left: -0.5vw;
  font-size: 1.1vw;
  line-height: 1.5vw;
  color: #5e5e5e;
}

.info-detail-tiket-namaTiket {
  font-size: 1.35vw;
  /* padding-top: 20px; */
  padding-bottom: 1vw;
  width: 33vw; /* Sesuaikan dengan lebar yang diinginkan */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: -1vw;
}

p.sudah__digunakan,
small.sudah__digunakan {
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  padding-top: 0.3vw;
  padding-bottom: 0.3vw;
  background-color: #a9ffd6;
  color: #149b5a;
  border-radius: 0.4vw;
  font-size: 0.8vw;
  font-weight: 700;
}
p.dapat__digunakan,
small.dapat__digunakan {
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  padding-top: 0.3vw;
  padding-bottom: 0.3vw;
  background-color: #a9d1ff;
  color: #146a9b;
  border-radius: 0.4vw;
  font-size: 0.8vw;
  font-weight: 700;
}
p.expired,
small.expired {
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  padding-top: 0.3vw;
  padding-bottom: 0.3vw;
  background-color: #e4e4e4;
  color: #828180;
  border-radius: 0.4vw;
  font-size: 0.8vw;
  font-weight: 700;
}

p.menunggu__pembayaran {
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  padding-top: 0.3vw;
  padding-bottom: 0.3vw;
  background-color: #ffcda9;
  color: #9b5514;
  border-radius: 0.4vw;
  font-size: 0.8vw;
  font-weight: 700;
}

.tiket__content img {
  padding-left: 3vw;
  width: 17vw;
  height: 7vw;
}

.custom-select option:hover {
  background-color: #007bff;
  color: #fff;
}

.labelharga {
  font-weight: 400;
  font-size: 1.1vw;
}

.total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Mendorong elemen ke tepi kiri dan kanan */
}

.info {
  padding-top: 1vw;
  display: flex;
  flex-direction: column; /* Menyusun paragraf total belanja dan harga secara vertikal */
}

.actions {
  color: #333;
  padding-top: 2vw;
  display: flex;
  gap: 0.8vw; /* Jarak antara paragraf */
}

.detail {
  color: #daa520;
  text-decoration: none;
  cursor: pointer;
  font-weight: 700;
}

.cara {
  cursor: pointer;
}

.search-label {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 0.5vw;
  left: 1vw; /* Sesuaikan posisi gambar */
  transform: translateY(-0.5vw);
  width: 1vw; /* Sesuaikan lebar gambar */
  height: auto; /* Sesuaikan tinggi gambar jika diperlukan */
}

.Pencarian {
  padding-left: 2.5vw; /* Sesuaikan padding kiri agar input tidak tumpang tindih dengan gambar */
}

.total__belanja {
  font-size: 0.9vw;
  line-height: 2vw;
  font-weight: 400;
  padding-top: 1vw;
  margin-right: 2vw;
  margin-top: -0.5vw;
}

.hrga {
  padding-bottom: 1vw;
  margin-right: 2vw;
  font-weight: 700;
  font-size: 1.1vw;
}

/* popup1 */

.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.104vw); /* 2px */
  z-index: 999;
}

.popup-content {
  background-color: #ffffff;
  padding: 0vh; /* 30px */
  border-radius: 0.52vw; /* 10px */
  width: 45vw; /* 840px */
  max-height: 100vh;
  overflow-y: auto;
}

.popup-content .isi {
  overflow-y: auto;
  max-height: calc(130vh - 40vw);
}

.close {
  color: #aaa;
  font-size: 2vw;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.isi {
  padding: 2vw;
  margin-left: 1vw;
}

.header {
  box-shadow: 0 0.0521vw rgba(0, 0, 0, 0.2); /* 1px */
  background: white;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5vw 3.5vw; /* 1.5rem 3.2rem */
}

.p {
  font-weight: 700;
  font-size: 1.5vw; /* 24px */
}

.Icon {
  width: 1.3vw; /* 20px */
  height: 1.3vw; /* 20px */
}

.info__details {
  display: flex;
  flex-direction: column;
}

.flex-container {
  padding-top: 1vw;
  font-weight: 500;
  font-size: 1.3vw;
}

.flex-container > div {
  display: flex;
  justify-content: space-between;
}

.detail-tiket {
  align-items: center;
}

.detail-tiket img {
  width: 9vw; /* 158px */
  height: 5vw; /* 71.72px */
  margin: 0.9375vw; /* 18px */
}

.info-detail-tiket p,
.info-detail-tiket label {
  display: flex;
  flex-direction: column;
}

.info-detail-tiket {
  display: flex;
  flex-direction: column;
  /* Menyusun elemen dalam satu kolom */
}

.info-detail-tiket-namaTiket-pp {
  line-height: 1.25vw; /* 24px */
  font-size: 1.2vw; /* 16px */
  font-weight: 400;
}

.detail-tiket {
  display: flex;
}

.detailtiket {
  font-size: 1.5vw;
  font-weight: 700;
  padding-top: 3vw;
}

.all-tiket img {
  width: 2vw;
  height: 0.7vw;
}

.all-tiket small {
  color: #daa520;
  font-weight: 700;
  font-size: 1vw;
}

.info-pembayaran {
  font-size: 20px;
  font-weight: 700;
  padding-top: 35px;
  padding-bottom: 20px;
}

.status-pembayaran {
  display: flex;
  gap: 22vw;
  font-weight: 400;
  font-size: 1.3vw;
  padding-bottom: 8px;
}

.status-pembayaran .small {
  padding-left: 0.5vw; /* 8px */
  padding-right: 0.5vw; /* 8px */
  padding-top: 0.5vw; /* 7px */
  background-color: #a9ffd6;
  color: #149b5a;
  border-radius: 0.2604vw; /* 5px */
  font-size: 0.9vw; /* 12px */
  font-weight: 500;
}

.pemesan {
  display: flex;
  gap: 15.9vw; /* Mengubah gap dari rem ke vw */
  font-size: 1.3vw; /* 20px */
  font-weight: 400;
}

.pemesan-email {
  background-color: #ffffff;
  color: #000000;
  font-size: 1.1vw; /* 14px */
  font-weight: 400;
}

.pemesan-usn {
  display: flex;
  font-size: 1.2vw; /* 16px */
  font-weight: 700;
}

.metode-pembayaran {
  display: flex;
  gap: 16vw; /* Mengubah gap dari rem ke vw */
  padding-top: 0.4167vw; /* 8px */
  padding-bottom: 0.4167vw; /* 8px */
}

.metode-pembayaran-txt {
  font-size: 1.2vw; /* 20px */
  font-weight: 400;
}

.metode-pembayaran-bank {
  font-size: 1.2vw; /* 16px */
  font-weight: 700;
}

.total-harga {
  display: flex;
  gap: 21.5vw; /* Mengubah gap dari rem ke vw */
  padding-top: 0.4167vw; /* 8px */
  padding-bottom: 0.4167vw; /* 8px */
}

.total-harga-txt {
  font-size: 1.3vw; /* 20px */
  font-weight: 400;
}

.total-harga-total {
  font-size: 1.2vw; /* 16px */
  font-weight: 700;
}

.biaya-layanan {
  display: flex;
  gap: 25.7vw; /* Mengubah gap dari rem ke vw */
  padding-top: 0.4167vw; /* 8px */
  padding-bottom: 0.4167vw; /* 8px */
}

.biaya-layanan-txt {
  font-size: 1.2vw; /* 20px */
  font-weight: 400;
}

.biaya-layanan-harga {
  font-size: 1.2vw; /* 16px */
  font-weight: 700;
}

.line {
  height: 0.1042vw; /* 2px */
  width: 100%;
  margin: 1.0417vw auto; /* 20px */
  background-image: repeating-linear-gradient(
    to right,
    #d9d9d9,
    #d9d9d9 0.7292vw,
    /* 7px */ transparent 0.5208vw,
    /* 5px / transparent 1.0417vw / 10px */
  );
}

.total-biaya {
  display: flex;
  gap: 26.6vw; /* Mengubah gap dari rem ke vw */
}

.total-biaya-txt {
  font-size: 1.2vw; /* 20px */
  font-weight: 700;
}

.total-biaya-total {
  font-size: 1.2vw; /* 16px */
  font-weight: 700;
}

/* popup2 */

.waiting-payment__content-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.waiting-payment__container-content {
  position: relative;
  background-color: white;
  border-radius: 10px;
  width: 671px;
  height: 512px;
  display: flex;
  flex-direction: column;
}
.waiting-payment__content-header {
  display: flex;
  flex-direction: row;
  height: 73px;
  padding: 1.5rem 3rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(208, 213, 221, 1);
}
.waiting-payment__close-button {
  font-size: 32px;
  color: rgba(52, 51, 48, 1);
}
.waiting-payment__close-button:hover {
  opacity: 0.5;
}
.waiting-payment__content-data {
  display: flex;
  flex-direction: column;
  padding: 0rem 2rem;
  gap: 1rem;
  overflow-y: auto;
}
.waiting-payment__content-desc {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 25px;
  justify-content: space-between;
}
.waiting-payment__content-desc img {
  width: 58px;
  height: 28px;
}
.waiting-payment__copy-desc {
  color: rgba(218, 165, 32, 1);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
}
.waiting-payment__copy-desc i {
  font-size: 32px;
}
.waiting-payment__copy-desc:hover {
  filter: brightness(70%);
}
.waiting-payment__content-sub {
  display: flex;
  flex-direction: column;
}
.p fs-f5 {
  font-size: 25px;
}
</style>
