import {checkTimerExists} from "./validators/checkTimerExists";
import Debate from "../../models/debate";

const deleteTimer = async function (req, res){
    try {
        const timer = await checkTimerExists(req.params.id);
        if (!timer) {
            return res.status(404).json({ message: 'Timer not found' });
        }

        const debate = await Debate.findOne({ timers: timer._id });
        if (debate) {
            const index = debate.timers.indexOf(timer._id);
            if (index > -1) {
                debate.timers.splice(index, 1);
                await debate.save();
            }
        }

        await timer.deleteOne({ _id: timer._id });
        return res.status(204).json({ message: 'Timer deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
}

module.exports = {deleteTimer};