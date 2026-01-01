"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronUp } from "lucide-react"

export default function LinkSiblings() {
    return (
        <DashboardLayout title="Student Sibling">
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-pink-100 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">Student Sibling List</h3>
                        <Button className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                            Link All Siblings
                        </Button>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Group 1 */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-[#f0f0f4] px-4 py-3 flex justify-between items-center border-b border-gray-200">
                                <h4 className="font-medium text-gray-800">Guardian Phone No. - 9772119901</h4>
                                <ChevronUp className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="p-0">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-pink-50 text-gray-700 font-bold border-b border-pink-100">
                                        <tr>
                                            <th className="px-4 py-3 w-10"></th>
                                            <th className="px-4 py-3">STUDENT NAME</th>
                                            <th className="px-4 py-3">ADMISSION NO</th>
                                            <th className="px-4 py-3">GUARDIAN NAME</th>
                                            <th className="px-4 py-3">GUARDIAN PHONE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr>
                                            <td className="px-4 py-3"><Checkbox className="border-gray-400" /></td>
                                            <td className="px-4 py-3">Pihu Jain (7th-C)</td>
                                            <td className="px-4 py-3">416</td>
                                            <td className="px-4 py-3">Ajit Jain</td>
                                            <td className="px-4 py-3">9772119901</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3"><Checkbox className="border-gray-400" /></td>
                                            <td className="px-4 py-3">Aarjav Jain (7th-C)</td>
                                            <td className="px-4 py-3">415</td>
                                            <td className="px-4 py-3">test</td>
                                            <td className="px-4 py-3">9772119901</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="p-4 flex justify-end bg-gray-50">
                                    <Button size="sm" className="bg-[#1e1e50] hover:bg-[#151538] text-white">
                                        Link Sibling
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Group 2 */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-[#f0f0f4] px-4 py-3 flex justify-between items-center border-b border-gray-200">
                                <h4 className="font-medium text-gray-800">Guardian Phone No. - 1234567890</h4>
                                <ChevronUp className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
