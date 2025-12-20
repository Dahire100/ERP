"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ScanFace } from "lucide-react"

export default function BiometricSetupPage() {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="p-2 bg-primary/10 rounded-md">
                        <ScanFace className="w-5 h-5 text-primary" />
                    </span>
                    Biometric Setup
                </h1>
                <div className="text-sm text-muted-foreground">
                    System Setting / Biometric Setup
                </div>
            </div>

            <Card>
                <CardHeader className="border-b bg-muted/20 pb-4">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <div className="bg-transparent text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                        </div>
                        Minop Biometric Integration
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
                        <div className="p-4 border-b md:border-b-0 md:border-r font-medium text-sm text-muted-foreground flex items-center">
                            Transactional Response
                        </div>
                        <div className="p-4 border-b md:border-b-0 relative group">
                            <p className="text-xs text-muted-foreground break-all pr-12 leading-relaxed">
                                Protocol :POST URL : https://erp.nletschool.com/api/DeviceApi/getAttendance Request body: {"{"} "dvcSrNo" : "911573950381867", "dvcTime" : "2018-02-27 09:00:00 +05:30:00" {"}"} Response body: {"{"} "status":1 {"}"}
                            </p>
                            <Button size="sm" variant="secondary" className="absolute top-2 right-2 h-6 text-xs" onClick={() => copyToClipboard('Protocol :POST URL : https://erp.nletschool.com/api/DeviceApi/getAttendance Request body: { "dvcSrNo" : "911573950381867", "dvcTime" : "2018-02-27 09:00:00 +05:30:00" } Response body: { "status":1 }')}>
                                copy
                            </Button>
                        </div>
                    </div>
                    <div className="border-t grid grid-cols-1 md:grid-cols-[200px_1fr]">
                        <div className="p-4 border-b md:border-b-0 md:border-r font-medium text-sm text-muted-foreground flex items-center">
                            Push Response
                        </div>
                        <div className="p-4 relative group">
                            <p className="text-xs text-muted-foreground break-all pr-12 leading-relaxed">
                                Protocol : POST URL : https://erp.nletschool.com/api/DeviceApi/saveAttendance Request body: {"{"} "trans": [ {"{"} "txnid":21, "dvcid":1, "dvcIP":"192.168.1.1", "punchid":1000, "txnDateTime":"2018-05-11 18:05:36", "mode":"IN" {"}"}, {"{"} "txnid":22, "dvcid":1, "dvcIP":"192.168.1.1", "punchid":1001, "txnDateTime":"2018-05-11 18:05:52", "mode":"IN" {"}"} ] {"}"} Response body: {"{"} "transStatus": [ {"{"} "txnid":21, "status":1 {"}"}, {"{"} "txnid":22, "status":1 {"}"} ] {"}"}
                            </p>
                            <Button size="sm" variant="secondary" className="absolute top-2 right-2 h-6 text-xs" onClick={() => copyToClipboard('Protocol : POST URL : https://erp.nletschool.com/api/DeviceApi/saveAttendance Request body: { "trans": [ { "txnid":21, "dvcid":1, "dvcIP":"192.168.1.1", "punchid":1000, "txnDateTime":"2018-05-11 18:05:36", "mode":"IN" }, { "txnid":22, "dvcid":1, "dvcIP":"192.168.1.1", "punchid":1001, "txnDateTime":"2018-05-11 18:05:52", "mode":"IN" } ] } Response body: { "transStatus": [ { "txnid":21, "status":1 }, { "txnid":22, "status":1 } ] }')}>
                                copy
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="border-b bg-muted/20 pb-4">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <div className="bg-transparent text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                        </div>
                        ESSL Biometric Integraion
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b">
                        <div className="p-4 border-r font-medium text-sm text-muted-foreground flex items-center">
                            Webhook Post URL
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <span className="text-sm">https://erp.nletschool.com/api/DeviceApi/saveEtimeAttendance</span>
                            <Button size="sm" variant="secondary" className="h-6 text-xs" onClick={() => copyToClipboard('https://erp.nletschool.com/api/DeviceApi/saveEtimeAttendance')}>copy</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-b">
                        <div className="p-4 border-r font-medium text-sm text-muted-foreground flex items-center">
                            Webhook Response
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <span className="text-sm">success</span>
                            <Button size="sm" variant="secondary" className="h-6 text-xs" onClick={() => copyToClipboard('success')}>copy</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
                        <div className="p-4 border-r font-medium text-sm text-muted-foreground flex items-center">
                            No of Logs
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <span className="text-sm">100</span>
                            <Button size="sm" variant="secondary" className="h-6 text-xs" onClick={() => copyToClipboard('100')}>copy</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
