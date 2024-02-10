import multer from 'multer';
import moment from 'moment';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '/defectsImage');
    },
    filename: (req, file, callback) => {
        callback(null, moment(Date.now()).format('DD-MM-YYYY') + '-defect')
    }
})

export const upload = multer({ storage }).single('image');
