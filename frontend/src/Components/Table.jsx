import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Typography,
   Button
 } from '@material-tailwind/react'

const TABLE_HEADER = [
   'Author',
   'Committer',
   'Time',
   'Message'
 ]

export default function({
   page,
   previousButton,
   nextButton,
   commits
}){
   return (
      <Card className='bg-gray-700 rounded'>
         <CardHeader floated={false} className='rounded-none bg-gray-700'>
         <Typography
            variant='h2'
            className='text-white'>
            Test Commits
         </Typography>
         </CardHeader>
         <CardBody className='py-1'>
         <table className='w-full table-auto rounded'>
            <thead>
               <tr>
               {
                  TABLE_HEADER.map(head => (
                     <th
                     key={head}
                     className='p-4 border-y border-blue-gray-200'
                     >
                     <Typography
                        variant='small'
                        className='text-white font-semibold leading-none opacity-70'>
                        {head}
                     </Typography>
                     </th>
                  ))
               }
               </tr>
            </thead>
            <tbody>
               {
               commits?.results?.map(
                  ({  id, author, committer, message }, index) => {
                     const isLast = index === commits.length - 1
                     const classes = isLast ?  '' : 'border-y border-blue-gray-200'

                     return (
                     <tr
                        key={id}
                        className={classes}>
                        <td className='p-4'>
                           <section
                           className='flex flex-col'>
                           <Typography
                              variant='small'
                              className='text-white font-normal'>
                              {author.name}
                           </Typography>
                           <Typography
                              variant='small'
                              className='text-white font-normal opacity-70'>
                              {author.email}
                           </Typography>
                           </section>
                        </td>
                        <td className='p-4'>
                           <section
                           className='flex flex-col'>
                           <Typography
                              variant='small'
                              className='text-white'>
                              {committer.name}
                           </Typography>
                           <Typography
                              variant='small'
                              className='text-white opacity-70'>
                              {committer.email}
                           </Typography>
                           </section>
                        </td>
                        <td className='p-4'>
                           <Typography
                              variant='small'
                              className='text-white'>
                              {new Date(committer.date).toGMTString()}
                           </Typography>
                        </td>
                        <td className='p-4'>
                           <Typography
                              variant='small'
                              className='text-white'>
                              {message}
                           </Typography>
                        </td>
                     </tr>
                     )
                  })
               }
            </tbody>
         </table>
         </CardBody>
         <CardFooter className='flex items-center justify-between p-3'>
         <Typography
            className='text-white'>
            Page {page.currentPage} of {commits.count}
         </Typography>
         <section  className='flex gap-2'>
            <Button
               onClick={previousButton}
               variant='outlined'
               size='sm'
               className='text-white border border-blue-gray-200'
               disabled={page.currentPage == 1}>
               Previous
            </Button>
            <Button
               onClick={nextButton}
               variant='outlined'
               size='sm'
               className='text-white border border-blue-gray-200'
               disabled={page.currentPage == commits?.count}>
               Next
            </Button>
         </section>
         </CardFooter>
      </Card>
   )
}