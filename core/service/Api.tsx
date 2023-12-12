import axios, { CancelTokenSource } from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

class Api {
  // Start Requirement ****************

  // URL permintaan
  public url = "";
  // Gunakan header Authorization
  public auth = false;
  // Token untuk Authorization
  public token = "";
  // Mode permintaan (service atau CRM)
  public mode: "service" | "crm" = "service";
  // Body permintaan dalam format JSON
  public body: Record<string, unknown> | null = null;
  // Gunakan akun dalam permintaan
  public useAccount = false;
  // Permintaan untuk download
  public download = false;
  // Data pengguna jika useAccount true
  public userID = 0;
  public email = "";
  // Nama file untuk download
  public filename = "filename.pdf";

  // End requirement ****************

  private source: CancelTokenSource | undefined;

  public abort() {
    if (this.source) {
      this.source.cancel("Api call cancelled");
      this.source = undefined;
    }
  }

  async call(): Promise<any> {
    const apiUrl = "http://192.168.100.7:3002/" + this.url;
    const crmUrl = "http://192.168.100.7:3002/" + this.url;

    const authToken = "ragpqnHMXVaD2eYxHwJM";
    const seindoAccessToken = `!SEINDOMOBILE`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization-Token": this.token,
    };

    if (this.auth) {
      headers["Authorization"] = this.token;
    }

    if (this.mode === "crm") {
      headers["Seindo-Access-Token"] = seindoAccessToken;
      if (this.useAccount) {
        this.body = {
          CustomerData: {
            userId: this.userID,
            email: this.email,
          },
          ...this.body,
        };
      }
    }

    this.source = axios.CancelToken.source();

    try {
      const response = await axios({
        method: "POST",
        url: this.mode === "service" ? apiUrl : crmUrl,
        headers,
        data: this.body,
        cancelToken: this.source.token,
        responseType: this.download ? "blob" : "json",
      });

      if (this.download) {
        const localUri = FileSystem.documentDirectory + this.filename;

        const base64Data = await blobToBase64(response.data);
        await FileSystem.writeAsStringAsync(localUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        if (!(await Sharing.isAvailableAsync())) {
          alert(`Sharing isn't available on your platform`);
          return;
        }

        await Sharing.shareAsync(localUri);
        return localUri;
      } else {
        return response.data;
      }
    } catch (error: any) {
      if (axios.isCancel(error)) {
        return error;
      }
      return error.response.data;
    } finally {
      this.source = undefined;
    }
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read blob."));
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      } else {
        reject(new Error("Failed to convert blob to base64."));
      }
    };
    reader.readAsDataURL(blob);
  });
}

export default Api;
