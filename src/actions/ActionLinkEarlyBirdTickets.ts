import { Linking } from "react-native";


const ActionLinkEarlyBirdTickets = () => {
    console.log('ActionLinkEarlyBirdTickets');


        let account = 'https://www.eventbrite.com/e/2024-caldac-convention-formerly-denver-salsa-bachata-congress-tickets-716510380837?aff=oddtdtcreator'
        Linking.canOpenURL(account).then(supported => {
                console.log("supported" + supported);
                if (!supported) return;
                Linking.openURL(account);
        }).catch(err => {
                console.error(err);
        });
}


// async function download() {
//   const filename = "dummy.pdf";
//   const result = await FileSystem.downloadAsync(
//     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
//     FileSystem.documentDirectory + filename
//   );

//   // Log the download result
//   console.log(result);

//   // Save the downloaded file
//   saveFile(result.uri, filename, result.headers["Content-Type"]);
// }

export default ActionLinkEarlyBirdTickets;