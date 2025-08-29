import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8">
          <div className="text-center">
            {/* Animated 404 number */}
            <div className="mb-6">
              <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                404
              </h1>
            </div>
            
            {/* Title and message */}
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Page Not Found</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Sorry, we couldn't find the page you're looking for. The resource may have been moved or deleted.
            </p>
            
            {/* Search suggestion */}
            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center mb-2">
                <Search className="h-5 w-5 text-slate-500 mr-2" />
                <h3 className="font-medium text-slate-800 dark:text-slate-200">Try searching</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                If you're not sure what you're looking for, try using the search feature to find relevant content.
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Link>
              </Button>
              <Button asChild className="flex items-center gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}