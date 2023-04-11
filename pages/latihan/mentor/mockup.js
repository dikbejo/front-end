import React from 'react'
import getConfig from 'next/config';
import { Image } from 'primereact/image';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

const mockup = () => {
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h5>Login</h5>
                    <div className="border-1 surface-border border-round m-1 text-center py-5">
                        <div className="mb-3">
                            <img src={`${contextPath}/mockup/login.png`} alt="Form Login" className="w-6 shadow-2" />
                        </div>
                        <div>
                            <h4 className="p-mb-1">Form Login</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>User</h5>
                    <div className="flex flex-wrap gap-2">
                        <div className="mb-4">
                            <div className="mb-3">
                                <Image src={`${contextPath}/mockup/daftar user.png`} alt="Daftar User" width={300} preview />
                            </div>
                            <div>
                                <h6 className="p-mb-1">Daftar User</h6>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-3">
                                <Image src={`${contextPath}/mockup/rekam user.png`} alt="Rekam User" width={300} preview />
                            </div>
                            <div>
                                <h6 className="p-mb-1">Rekam User</h6>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-3">
                                <Image src={`${contextPath}/mockup/ubah hapus user.png`} alt="Ubah Hapus User" width={300} preview />
                            </div>
                            <div>
                                <h6 className="p-mb-1">Ubah Hapus User</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Group User</h5>
                    <div className="flex flex-wrap gap-2">
                        <div className="mb-4">
                            <div className="mb-3">
                                <Image src={`${contextPath}/mockup/daftar group user.png`} alt="Daftar Group User" width={300} preview />
                            </div>
                            <div>
                                <h6 className="p-mb-1">Daftar Group User</h6>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-3">
                                <Image src={`${contextPath}/mockup/rekam group user.png`} alt="Rekam Group User" width={300} preview />
                            </div>
                            <div>
                                <h6 className="p-mb-1">Rekam Group User</h6>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-3">
                                <Image src={`${contextPath}/mockup/ubah hapus group user.png`} alt="Ubah Hapus Group User" width={300} preview />
                            </div>
                            <div>
                                <h6 className="p-mb-1">Ubah Hapus Group User</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Menu</h5>
                    <div className="flex flex-wrap gap-2">
                        <div className="mb-4">
                            <div className="mb-3">
                                <Image src={`${contextPath}/mockup/daftar menu.png`} alt="Daftar Menu" width={300} preview />
                            </div>
                            <div>
                                <h6 className="p-mb-1">Daftar Menu</h6>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-3">
                                <Image src={`${contextPath}/mockup/rekam menu.png`} alt="Rekam Menu" width={300} preview />
                            </div>
                            <div>
                                <h6 className="p-mb-1">Rekam Menu</h6>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-3">
                                <Image src={`${contextPath}/mockup/ubah hapus menu.png`} alt="Ubah Hapus Menu" width={300} preview />
                            </div>
                            <div>
                                <h6 className="p-mb-1">Ubah Hapus Menu</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default mockup
