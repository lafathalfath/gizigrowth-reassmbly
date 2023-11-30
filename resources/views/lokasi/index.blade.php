@extends('layouts.main')

@section('content')
    <div class="container p-2">
        <h1 class="h1 mb-3">Tabel Data Lokasi</h1>
        <a href="lokasi/add" class="btn" style="background-color: #94c73f; color: #fff;">Tambah Lokasi</a>
        <form action="/lokasi" class="mt-2">
            <input type="text" name="search" style="
                border-radius: 5px;
                border: 1px solid #aaa;
                height: 35px;
            ">
            <input type="submit" value="Search" class="btn btn-success">
        </form>

        <table border="1px" class="table table-hover">
            <tr>
                <th>No</th>
                <th>
                    Nama Lokasi &ensp;
                    <a href="{{ route('sort', ['column' => 'nama_lokasi', 'order' => 'asc']) }}" class="btn btn-secondary btn-sm p-1">&#8639;</a>
                    <a href="{{ route('sort', ['column' => 'nama_lokasi', 'order' => 'desc']) }}" class="btn btn-secondary btn-sm p-1">&#8642;</a>
                </th>
                <th>
                    Kabupaten/Kota &ensp;
                    <a href="{{ route('sort', ['column' => 'kabupaten_kota', 'order' => 'asc']) }}" class="btn btn-secondary btn-sm p-1">&#8639;</a>
                    <a href="{{ route('sort', ['column' => 'kabupaten_kota', 'order' => 'desc']) }}" class="btn btn-secondary btn-sm p-1">&#8642;</a>
                </th>
                <th>
                    Provinsi &ensp;
                    <a href="{{ route('sort', ['column' => 'provinsi', 'order' => 'asc']) }}" class="btn btn-secondary btn-sm p-1">&#8639;</a>
                    <a href="{{ route('sort', ['column' => 'provinsi', 'order' => 'desc']) }}" class="btn btn-secondary btn-sm p-1">&#8642;</a>
                </th>
                <th>Longitude</th>
                <th>Laitude</th>
                <th>Aksi</th>
            </tr>
            @foreach ($lokasi as $index => $loc)
                <tr>
                    {{-- <td>{{$loc->id}}</td> --}}
                    <td>{{$index + $lokasi->firstItem()}}</td>
                    <td>{{$loc->nama_lokasi}}</td>
                    <td>{{$loc->kabupaten_kota}}</td>
                    <td>{{$loc->provinsi}}</td>
                    <td>{{$loc->koordinat_x}}</td>
                    <td>{{$loc->koordinat_y}}</td>
                    <td class="btn-group gap-2" role="group">
                        <a href="/lokasi/{{$loc->id}}/edit" class="btn btn-warning rounded">Edit</a>
                        <form action="/lokasi/{{$loc->id}}" method="POST">
                            @csrf
                            @method('delete')
                            <input type="submit" value="Delete" class="btn btn-danger rounded">
                        </form>
                    </td>
                </tr>
            @endforeach
        </table>
        <br>
        {{ $lokasi->links() }}
        {{-- <a href="/lokasi?page=1">1</a>
        <a href="/lokasi?page=2">2</a>
        <a href="/lokasi?page=3">3</a> --}}
    </div>
@endsection