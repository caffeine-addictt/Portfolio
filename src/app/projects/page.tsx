import * as React from 'react'
import { Metadata } from 'next'
import { getAllSkills, getAllProjects } from '@lib/sanity/client'

import SearchUI from './search'
import { ProjectCards } from './projectcard'




export const metadata: Metadata = {
  title: 'My Projects',
  description: 'Interested in what I have done so far? Check out my projects!'
}


interface PageParamProps { searchParams?: { query?: string; page?: string; tech?: string[] | string } }
const ProjectsListPage = async ({ searchParams }: PageParamProps) => {
  const data = await getAllProjects()
  const skills = await getAllSkills()

  return (
    <div className='flex min-h-screen min-w-full max-w-full flex-col items-center' style={{ minHeight: 'calc(100vh - 64px)' }}>

      {/* Filtering */}
      <SearchUI
        skills={skills}
        searchParams={{
          ...searchParams,
          tech: !!searchParams?.tech ? Array.from(Array.isArray(searchParams?.tech) ? searchParams?.tech : [searchParams?.tech]) : undefined
        }}
      />

      <div className='flex flex-wrap gap-2 mb-4 w-[80%] max-sm:w-[97.5%] self-center justify-center'>
        <ProjectCards data={data} />
      </div>
    </div>
  )
}
export default ProjectsListPage
