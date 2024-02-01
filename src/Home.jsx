import React from 'react'
export default function Component() {
    return (
        <section className="w-full py-24 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-bold text-white tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none">Καλώς ήρθατε</h1>
                        <p className="mx-auto max-w-[700px] mt-4 text-gray-500 md:text-xl dark:text-gray-400">
                            Συνδεθήκατε στην πλατφόρμα μας με ασφάλεια!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
