import ContactOffice from '../../Model/contact/contact.js'
import cloudinary from '../../Config/Cloudinary.js'
import fs from 'fs' // Assuming you have this Mongoose model
import exp from 'constants';

// Create a new contact office
export const addContactOffice = async (req, res) => {
  try {
    const { title, findonmap, pin, landmark, area, city, state,country} = req.body;
    
    // Check if required fields are missing
    if (!title || !findonmap ) {
      return res.status(400).json({
        message: 'All fields are required!',
        success: false
      });
    }
    const uploaded=await cloudinary.uploader.upload(req.file.path);

    fs.unlinkSync(req.file.path);
   const imagpath=uploaded.secure_url;
      
    // Create the new contact office
    const newOffice = new ContactOffice({ title, findonmap,area ,pin, state,landmark,city , country,image:imagpath});
    await newOffice.save();

    return res.status(201).json({
      message: 'Contact office added successfully!',
      success: true,
      office: newOffice
    });
  } catch (error) {
    console.error('Error creating contact office:', error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
};

// Update contact office by ID
export const updateContactOfficeById = async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the route params
      const { title, findonmap, pin, landmark, area,country, city, state} = req.body;
  
      // Check if required fields are missing
      if (!title || !findonmap ) {
        return res.status(400).json({
          message: 'All fields are required!',
          success: false
        });
      }
  
      // Find the existing office by ID to get the previous image URL
      const existingOffice = await ContactOffice.findById(id);
      if (!existingOffice) {
        return res.status(404).json({
          message: 'Contact office not found!',
          success: false
        });
      }
  
      let imagpath = existingOffice.image; // Default to the previous image URL
  
      // Check if a new file has been uploaded
      if (req.file) {
        // Upload the new file to cloudinary
        const uploaded = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path); // Delete the file from the server after upload
        imagpath = uploaded.secure_url; // Set the new image path
      }
  
      // Update the contact office with new data (title, findonmap, address, and image)
      const updatedOffice = await ContactOffice.findByIdAndUpdate(
        id,
        { title, findonmap, pin,city,landmark,country, area, state,image: imagpath },
        { new: true }
      );
  
      return res.status(200).json({
        message: 'Contact office updated successfully!',
        success: true,
        office: updatedOffice
      });
    } catch (error) {
      console.error('Error updating contact office:', error);
      return res.status(500).json({
        message: 'Internal server error',
        success: false
      });
    }
  };
  

// Delete contact office by ID
export const deleteContactOfficeById = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the route params

    // Find and delete the contact office by ID
    const deletedOffice = await ContactOffice.findByIdAndDelete(id);

    if (!deletedOffice) {
      return res.status(404).json({
        message: 'Contact office not found!',
        success: false
      });
    }

    return res.status(200).json({
      message: 'Contact office deleted successfully!',
      success: true
    });
  } catch (error) {
    console.error('Error deleting contact office:', error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
};
export const getallContactOffice=async(req,res)=>{
    try{
        const all=await ContactOffice.find({});
        return res.status(201).json(all);
    }
    catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
