import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default ({ showActionSheetWithOptions }) => {
  const options = ['Take a picture', 'Choose from library', 'Cancel'];
  const cancelButtonIndex = 2;

  return new Promise((resolve, reject) => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 2) {
          return;
        }
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (status !== 'granted') {
          return;
        }

        if (buttonIndex === 0) {
          resolve(ImagePicker.launchCameraAsync({ base64: true, exif: false }));
        } else if (buttonIndex === 1) {
          resolve(ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, base64: true, exif: false }));
        }
      },
    );
  });
};
