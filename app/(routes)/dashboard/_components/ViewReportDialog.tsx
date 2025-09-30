"use client"
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { SessionDetail } from '../medical-agent/[sessionid]/page'

interface Props {
  record: SessionDetail;
}

function ViewReportDialog({ record }: Props) {
  const report: any = record?.report
  const formatDate = moment(record?.createdOn).format("MMMM Do YYYY, h:mm a")
  
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant={'link'} size={'sm'}>View Report</Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle asChild>
              <h2 className='text-center text-2xl font-bold text-gray-800'>
                Medical AI Voice Agent Report
              </h2>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="mt-6 space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h2 className='font-bold text-blue-600 text-lg mb-3'>Section Info</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Doctor:</p>
                      <p>{record?.selectedDoctor?.specialist || 'No data'}</p>
                    </div>
                    <div>
                      <p className="font-semibold">User:</p>
                      <p>{report?.user || 'No data'}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Consulted On:</p>
                      <p>{report?.timestamp ? moment(report.timestamp).format("MMMM Do YYYY, h:mm a") : formatDate}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Agent:</p>
                      <p>{report?.agent || 'No data'}</p>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-300" />

                <div>
                  <h2 className='font-bold text-blue-600 text-lg mb-2'>Chief Complaint</h2>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">
                    {report?.chiefComplaint || 'No data'}
                  </p>
                </div>

                <hr className="border-gray-300" />

                <div>
                  <h2 className='font-bold text-blue-600 text-lg mb-2'>Summary</h2>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">
                    {report?.summary || 'No data'}
                  </p>
                </div>

                <hr className="border-gray-300" />

                <div>
                  <h2 className='font-bold text-blue-600 text-lg mb-2'>Symptoms</h2>
                  <div className="bg-gray-50 p-3 rounded">
                    {(report?.symptoms && report.symptoms.length > 0) 
                        ? (
                            <ul className="list-disc list-inside space-y-1">
                              {report.symptoms.map((symptom: string, index: number) => (
                                <li key={index} className="text-gray-700">{symptom}</li>
                              ))}
                            </ul>
                          )
                        : <p className="text-gray-500">No data</p>
                    }
                  </div>
                </div>

                <hr className="border-gray-300" />

                <div>
                  <h2 className='font-bold text-blue-600 text-lg mb-3'>Duration & Severity</h2>
                  <div className="bg-gray-50 p-4 rounded">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-semibold">Duration</th>
                          <th className="text-left py-2 font-semibold">Severity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2">{report?.duration || 'No data'}</td>
                          <td className="py-2">{report?.severity || 'No data'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr className="border-gray-300" />
                <div>
                  <h2 className='font-bold text-blue-600 text-lg mb-2'>Medications Mentioned</h2>
                  <div className="bg-gray-50 p-3 rounded">
                    {(report?.medicationsMentioned && report.medicationsMentioned.length > 0) 
                        ? (
                            <ul className="list-disc list-inside space-y-1">
                              {report.medicationsMentioned.map((med: string, index: number) => (
                                <li key={index} className="text-gray-700">{med}</li>
                              ))}
                            </ul>
                          )
                        : <p className="text-gray-500">No data</p>
                    }
                  </div>
                </div>
                <hr className="border-gray-300" />
                <div>
                  <h2 className='font-bold text-blue-600 text-lg mb-2'>Recommendations</h2>
                  <div className="bg-gray-50 p-3 rounded">
                    {(report?.recommendations && report.recommendations.length > 0) 
                        ? (
                            <ul className="list-disc list-inside space-y-1">
                              {report.recommendations.map((rec: string, index: number) => (
                                <li key={index} className="text-gray-700">{rec}</li>
                              ))}
                            </ul>
                          )
                        : <p className="text-gray-500">No data</p>
                    }
                  </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-6 pt-4 border-t">
                  <p>This report was generated by an AI Medical Assistant for informational purposes only.</p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ViewReportDialog