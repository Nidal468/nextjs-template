'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { FaBook, FaSearch } from 'react-icons/fa'
import { INovel } from '@/model/novel'
import genres from '@/lib/genre'
import Navbar from '@/components/nav'
import Footer from '@/components/footer'
import Novel from '@/components/novel'

export default function Browse() {
    const [search, setSearch] = useState('')
    const [genreFilter, setGenreFilter] = useState('All')
    const [novels, setNovels] = useState<INovel[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const novelsPerPage = 6

    const fetchNovels = async (page: number, searchTerm: string, genre: string) => {
        try {
            // Replace this with your real API endpoint
            const query = new URLSearchParams({
                page: page.toString(),
                limit: novelsPerPage.toString(),
                search: searchTerm,
                genre,
            })
            const res = await fetch(`/api/novels?${query}`)
            const data = await res.json()
            setNovels(data.novels)
            setTotalPages(data.totalPages)
        } catch (err) {
            console.error('Failed to fetch novels:', err)
            setNovels([])
            setTotalPages(1)
        }
    }

    useEffect(() => {
        fetchNovels(currentPage, search, genreFilter)
    }, [currentPage, search, genreFilter])

    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

    return (
        <div className="p-6 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] w-full min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Browse Novels</h1>
            {/* Search Bar */}
            <div className="flex gap-4 mb-6">
                <Input
                    placeholder="Search novels..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
                />
                <Button variant="default" className='bg-[#5bc0be]'>
                    <FaSearch className="mr-2" /> Search
                </Button>
            </div>

            {/* Genre Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {genres.map((g) => (
                    <Button
                        key={g}
                        variant={genreFilter === g ? 'default' : 'outline'}
                        onClick={() => { setGenreFilter(g); setCurrentPage(1) }}
                        className={`${genreFilter === g ? 'bg-[#5bc0be] text-white hover:bg-[#5bc0be]/80' : ""}`}
                    >
                        {g}
                    </Button>
                ))}
            </div>

            {/* Novels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {novels.map((novel, i) => (
                    <Novel key={i} novel={novel} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <Button onClick={handlePrev} disabled={currentPage === 1} className="bg-[#5bc0be] text-white hover:bg-[#5bc0be]/80">
                    Prev
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button onClick={handleNext} disabled={currentPage === totalPages} className="bg-[#5bc0be] text-white hover:bg-[#5bc0be]/80">
                    Next
                </Button>
            </div>
        </div>
    )
}
