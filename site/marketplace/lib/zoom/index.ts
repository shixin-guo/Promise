import zoomSDK from '@zoom/appssdk'

export async function createZoomConfig() {
  const resp = await zoomSDK.config({
    popoutSize: {width: 480, height: 360},
    capabilities: ["shareApp", "getScreenshot"]
  })
  console.log(resp)
}