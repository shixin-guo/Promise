import zoomSDK from '@zoom/appssdk'

export async function createZoomConfig() {
  try {
    const resp = await zoomSDK.config({
      popoutSize: {width: 480, height: 360},
      capabilities: ["shareApp", "getScreenshot"]
    })
    console.log(resp)
    console.log(zoomSDK)
    return resp
    // test getscreentshot
  } catch (err) {
    console.log(err)
  }
}