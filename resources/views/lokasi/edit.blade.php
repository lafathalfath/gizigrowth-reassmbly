@extends('layouts.main')

@section('content')
    <div class="container">
        <h1 class="h1 mb-5">Ubah Data Lokasi</h1>
        <form action="/lokasi/{{$lokasi->id}}" method="POST">
            @method('put')
            @csrf
            <label for="nama">Nama Lokasi</label>
            <input type="text" placeholder="Nama Lokasi..." name="nama_lokasi" value="{{$lokasi->nama_lokasi}}" id="nama" class="form-control mb-3">
            <label for="kabupaten">Nama Kabupaten atau Kota</label>
            <input type="text" placeholder="Kabupaten/Kota" name="kabupaten_kota" value="{{$lokasi->kabupaten_kota}}" id="kabupaten" class="form-control mb-3">
            <label for="provinsi">Nama Provinsi</label>
            <input type="text" placeholder="Provinsi" name="provinsi" value="{{$lokasi->provinsi}}" id="provinsi" class="form-control mb-3">
            <label for="longitude">Letak Koordinat Longitude</label>
            <input type="text" placeholder="Koordinat (Longitude)" name="koordinat_x" value="{{$lokasi->koordinat_x}}" id="longitude" class="form-control mb-3">
            <label for="latitude">Letak Koordinat Latitude</label>
            <input type="text" placeholder="Koordinat (Latitude)" name="koordinat_y" value="{{$lokasi->koordinat_y}}" id="latitude" class="form-control mb-3">

            <input type="submit" name="submit" value="Update" class="btn btn-success">
        </form>
    </div>
@endsection
