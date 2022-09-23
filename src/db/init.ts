import { Categories } from "../models/category";
import { Videos } from "../models/video";


const dbInit = () => {
    Videos.sync().then(() => {
        console.log('Video table created successfully!');
     }).catch((error) => {
        console.error('Unable to create table : ', error);
     });
     Categories.sync().then(() => {
        console.log('Category table created successfully!');
     }).catch((error) => {
        console.error('Unable to create table : ', error);
     });
}
export default dbInit;
