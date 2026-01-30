import Requirement from "../models/Requirement.js";

export const createRequirement = async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      eventDate,
      eventDateRange,
      location,
      venue,
      vendorType,
      contactInfo,
      plannerDetails,
      performerDetails,
      crewDetails,
    } = req.body;

    // Validate required fields
    if (!eventName || !eventType || !eventDate || !location || !vendorType || !contactInfo) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate vendor-specific details
    if (vendorType === "event-planner" && !plannerDetails) {
      return res.status(400).json({
        success: false,
        message: "Planner details are required for event planner vendor type",
      });
    }

    if (vendorType === "performer" && !performerDetails) {
      return res.status(400).json({
        success: false,
        message: "Performer details are required for performer vendor type",
      });
    }

    if (vendorType === "crew" && !crewDetails) {
      return res.status(400).json({
        success: false,
        message: "Crew details are required for crew vendor type",
      });
    }

    // Create new requirement
    const newRequirement = new Requirement({
      eventName,
      eventType,
      eventDate,
      eventDateRange,
      location,
      venue,
      vendorType,
      contactInfo,
      plannerDetails,
      performerDetails,
      crewDetails,
    });

    // Save to database
    await newRequirement.save();

    res.status(201).json({
      success: true,
      message: "Requirement posted successfully",
      data: newRequirement,
    });
  } catch (error) {
    console.error("Error creating requirement:", error);
    res.status(500).json({
      success: false,
      message: "Error creating requirement",
      error: error.message,
    });
  }
};

export const getRequirements = async (req, res) => {
  try {
    const { vendorType, status } = req.query;

    // Build filter object
    const filter = {};
    if (vendorType) filter.vendorType = vendorType;
    if (status) filter.status = status;

    const requirements = await Requirement.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements,
    });
  } catch (error) {
    console.error("Error fetching requirements:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching requirements",
      error: error.message,
    });
  }
};

export const getRequirementById = async (req, res) => {
  try {
    const { id } = req.params;

    const requirement = await Requirement.findById(id);

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: requirement,
    });
  } catch (error) {
    console.error("Error fetching requirement:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching requirement",
      error: error.message,
    });
  }
};

export const updateRequirement = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const requirement = await Requirement.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Requirement updated successfully",
      data: requirement,
    });
  } catch (error) {
    console.error("Error updating requirement:", error);
    res.status(500).json({
      success: false,
      message: "Error updating requirement",
      error: error.message,
    });
  }
};

export const deleteRequirement = async (req, res) => {
  try {
    const { id } = req.params;

    const requirement = await Requirement.findByIdAndDelete(id);

    if (!requirement) {
      return res.status(404).json({
        success: false,
        message: "Requirement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Requirement deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting requirement:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting requirement",
      error: error.message,
    });
  }
};
