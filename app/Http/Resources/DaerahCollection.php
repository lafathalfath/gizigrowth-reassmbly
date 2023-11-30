<?php

namespace App\Http\Resources;

use App\Models\Daerah;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class DaerahCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=>$this->collection,
        ];
    }
}
