@extends('layouts.main')

@section('content')
    <div class="container">
        <h1 class="h1 mb-5">Tambah Data Lokasi</h1>
        <form action="/lokasi/store" method="POST">
            @csrf
            <label for="nama">Nama Lokasi</label>
            <input type="text" placeholder="Nama Lokasi..." name="nama_lokasi" id="nama" class="form-control mb-3">
            <label for="kabupaten">Nama Kabupaten atau Kota</label>
            <input type="text" placeholder="Kabupaten/Kota" name="kabupaten_kota" id="kabupaten" class="form-control mb-3">
            <label for="provinsi">Nama Provinsi</label>
            <input type="text" placeholder="Provinsi" name="provinsi" id="provinsi" class="form-control mb-3">
            <label for="longitude">Letak Koordinat Longitude</label>
            <input type="text" placeholder="Koordinat (Longitude)" name="koordinat_x" id="longitude" class="form-control mb-3">
            <label for="latitude">Letak Koordinat Latitude</label>
            <input type="text" placeholder="Koordinat (Latitude)" name="koordinat_y" id="latitude" class="form-control mb-3">

            <input type="submit" name="submit" value="Save" class="btn btn-success">
        </form>
    </div>
@endsection