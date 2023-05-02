import { ref } from "vue"
import CryptoJS from "crypto-js";
import axios from "axios";

const useAuth = () => {

  //Data
  const email = ref('');
  const password = ref('');
  const privateKey = ref('DGDFGDbnbnTRTEfg67hgyTYRTY56gfhdR6');
  const publicKey = ref('VBNfgfTYrt5666FGHFG6FGH65GHFGHF656g');
  const showPassword = ref(false);
  const signature = ref('');
  const timezone = ref(null);
  const token = ref('');

  axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

  //Methods
  const getTimeZone = () => {
    axios
      .get('timezone')
      .then((response) => {
        timezone.value = response.data.timezone;
        hash256();
      })
      .catch(() => {

      });
  }

  const hash256 = () => {
    signature.value = CryptoJS.SHA256(`${privateKey.value},${publicKey.value},${timezone.value}`).toString();
  }


  return {
    email,
    password,
    privateKey,
    publicKey,
    showPassword,
    signature,
    timezone,
    token,

    getTimeZone,
    hash256,
  }
}

export default useAuth;