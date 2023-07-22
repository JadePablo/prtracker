import deleteVideo from "@form_helpers/deleteVideo";

// Fetches all verified gyms
export const DELETE = async (request, { params }) => {
  try {
    let { publicID } = params;

    publicID = `prs/${publicID}`

    const result = await deleteVideo(publicID);
    console.log('Delete Video Result:', result);

    return new Response(JSON.stringify('video deleted'), { status: 200 });
  } catch (error) {
    console.error('Error occurred during video deletion:', error);

    return new Response(JSON.stringify('failed to delete'), { status: 500 });
  }
};
