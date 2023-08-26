export interface CommitModel {
   id: string;
   author: {
     name: string;
     email: string;
     date: Date;
   };
   commiter: {
     name: string;
     email: string;
     date: Date;
   };
   message: string;
 }

 export interface ResponseModel {
    count: string;
    previous: string;
    next: string;
    results: CommitModel[]
 }