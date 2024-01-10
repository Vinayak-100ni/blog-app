import React, { useCallback, useEffect } from 'react'
import appwriteService from "../../appwrite/config"
import { useForm } from 'react-hook-form'
import { InputTag, Button, RTE, Select } from "../index"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({ post }) => {

  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData)

  console.log(userData);


  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteService.deleteFile(post.contentImg)
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        contentImg: file ? file.$id : undefined,
      })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id
        data.contentImg = fileId;
        const dbPost = await appwriteService.createPost({
          ...data, userId: userData.$id
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return ''
  }, [])

  useEffect(() => {

    const subscription = watch((value, { name }) => {  // subscription(variable) will be created with the help of watch method and it will be unsubscribed with the help of callback return for memory management and it is optimized technique too.
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    })

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
        <InputTag
          label='Title: '
          placeholder='Enter title'
          className="mb-4 "
          {...register("title", { required: true })}
        />
        <InputTag
          label='Slug: '
          placeholder='Slug'
          className="mb-4 "
          {...register("slug", { required: true })}
          onInput={(e) => { setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true }) }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className='w-1/3 px-2'>
        <InputTag
          label='Featured Image : '
          type="file"
          className="mb-4 "
          accept="image/png ,impage/jpg, image/jpeg,image/gif"
          {...register("image", { required: !post })}
        />
        {
          post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.contentImg)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )
        }

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })} />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm
