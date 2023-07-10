export const POST = async (request, { params }) => {
    try {
      await connectToDB();
  
      const { gymName } = params;
  
      // Find the gym with the given gymName
      const gym = await Gym.findOne({ gymName: gymName });
      if (!gym) {
        return new Response("Gym not found", { status: 404 });
      }
      const {lift,weight,location} = await request.json();
      // Create a new Pr document with the provided data
     const newPr = new Pr({ lift, weight, location });
  
      // Set the location to the gym's _id
      newPr.location = gym._id;
  
      // Save the new Pr document to the database
      const savedPr = await newPr.save();

  
      return new Response(JSON.stringify(savedPr), { status: 201 });
    } catch (error) {
      return new Response("Failed to create Pr document", { status: 500 });
    }
  };