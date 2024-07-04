<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Utilisateur;
use App\Models\Voiture;
use App\Models\Constructeur;
use Illuminate\Foundation\Testing\RefreshDatabase;

class WebRoutesTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function home_page_is_accessible()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /** @test */
    public function voitures_index_is_accessible()
    {
        $response = $this->get('/voitures');

        $response->assertStatus(200);
    }

    /** @test */
    public function contact_page_is_accessible()
    {
        $response = $this->get('/contact');

        $response->assertStatus(200);
    }

    /** @test */
    public function about_page_is_accessible()
    {
        $response = $this->get('/about');

        $response->assertStatus(200);
    }

    /** @test */
    public function registration_page_is_accessible()
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    /** @test */
    public function login_page_is_accessible()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    /** @test */
    public function authenticated_user_can_access_authenticated_routes()
    {
        $user = Utilisateur::factory()->create();

        $this->actingAs($user, 'sanctum');

        $response = $this->get('/voitures/create');
        $response->assertStatus(200);

        $response = $this->get('/utilisateurs');
        $response->assertStatus(200);
    }

    /** @test */
    public function guest_cannot_access_authenticated_routes()
    {
        $response = $this->get('/voitures/create');
        $response->assertRedirect('/login');

        $response = $this->get('/utilisateurs');
        $response->assertRedirect('/login');
    }

    /** @test */
    public function constructeur_routes_work_correctly()
    {
        $constructeur = Constructeur::factory()->create();

        $response = $this->get(route('constructeurs.index'));
        $response->assertStatus(200);

        $response = $this->get(route('constructeurs.create'));
        $response->assertStatus(200);

        $response = $this->post(route('constructeurs.store'), $constructeur->toArray());
        $response->assertRedirect(route('constructeurs.index'));

        $response = $this->get(route('constructeurs.show', $constructeur->id));
        $response->assertStatus(200);

        $response = $this->get(route('constructeurs.edit', $constructeur->id));
        $response->assertStatus(200);

        $response = $this->put(route('constructeurs.update', $constructeur->id), $constructeur->toArray());
        $response->assertRedirect(route('constructeurs.index'));

        $response = $this->delete(route('constructeurs.destroy', $constructeur->id));
        $response->assertRedirect(route('constructeurs.index'));
    }
}
