import { Post } from "@prisma/client";
import { Context } from "..";

interface PostCreateArgs {
   post:  {  
    title: string
    content: string
   }
}

interface PostPayloadType {
  userErrors : {
    message: string
  }[],
  post: Post | null

}

export const Mutation = {
    postCreate: async (parent : any, {post} : PostCreateArgs, {prisma} : Context) : Promise<PostPayloadType> => {
       const {title, content} = post ;
      const created = await prisma.post.create({
        data : 
        { 
          title,
          content,
          authorId: 1
        }
      })
      return {
        userErrors: [],
        post : created
      }
    },
    postUpdate: async (parent: any, args: {title: string, content: string, postId : string}, {prisma} : Context) => {
          
          const {title, content , postId} = args ;
          if(!title && !content) throw Error('provide something new') ;
          const concerned = await prisma.post.findUnique({
            where: {
              id: Number(postId)
            }
          }) ;
          if(!concerned) throw new Error("post not found") ;
          
          let payloadToUpdate = {
            title,
            content
          }
          if(!title) delete (payloadToUpdate as Partial<any>).title ;
          if(!content) delete (payloadToUpdate as Partial<any>).content ;

          return prisma.post.update({
            where : {id: Number(postId)},
            data : {...payloadToUpdate}
          })
    },
    postDelete: async(parent: any, {postId} : {postId: string}, { prisma}: Context) => {
         return prisma.post.delete({
          where : {
            id: Number(postId)
          }
         })
    }
}