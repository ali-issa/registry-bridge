import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';

export default class RegistryExtensionModel extends Model {
    /** @ids */
    @attr('string') uuid;
    @attr('string') company_uuid;
    @attr('string') created_by_uuid;
    @attr('string') registry_user_uuid;
    @attr('string') current_bundle_uuid;
    @attr('string') next_bundle_uuid;
    @attr('string') category_uuid;
    @attr('string') icon_uuid;
    @attr('string') public_id;
    @attr('string') current_bundle_id;

    /** @relationships */
    @belongsTo('company') company;
    @belongsTo('user') created_by;
    @belongsTo('category') category;
    @belongsTo('registry-extension-bundle') current_bundle;
    @belongsTo('registry-extension-bundle') next_bundle;
    @belongsTo('file') icon;
    @hasMany('file') screenshots;

    /** @attributes */
    @attr('string', { defaultValue: 'https://flb-assets.s3.ap-southeast-1.amazonaws.com/static/default-extension-icon.svg' }) icon_url;
    @attr('string') name;
    @attr('string') subtitle;
    @attr('string') package_name;
    @attr('string') composer_name;
    @attr('boolean') payment_required;
    @attr('string') price;
    @attr('string') sale_price;
    @attr('boolean') on_sale;
    @attr('boolean') subscription_required;
    @attr('string', { defaultValue: 'flat_rate' }) subscription_model;
    @attr('string', { defaultValue: 'monthly' }) subscription_billing_period;
    @attr('string') subscription_amount;
    @attr('array') subscription_tiers;
    @attr('string', { defaultValue: 'USD' }) currency;
    @attr('string') slug;
    @attr('string', { defaultValue: '1.0.0' }) version;
    @attr('string') fa_icon;
    @attr('string') description;
    @attr('string') current_bundle_filename;
    @attr('string') next_bundle_filename;
    @attr('string') promotional_text;
    @attr('string') website_url;
    @attr('string') repo_url;
    @attr('string') support_url;
    @attr('string') privacy_policy_url;
    @attr('string') tos_url;
    @attr('string') copyright;
    @attr('string') primary_language;
    @attr('array') tags;
    @attr('array') languages;
    @attr('object') meta;
    @attr('boolean') core_service;
    @attr('string', { defaultValue: 'pending' }) status;

    /** @dates */
    @attr('date') created_at;
    @attr('date') updated_at;
    @attr('date') deleted_at;

    /** @methods */
    /**
     * Submits the registry extension for review.
     *
     * @return {Promise<RegistryExtensionModel>}
     * @memberof RegistryExtensionModel
     */
    @action submitForReview(params = {}) {
        const owner = getOwner(this);
        const fetch = owner.lookup('service:fetch');

        return fetch.post(`registry-extensions/${this.id}/submit`, params, { namespace: '~registry/v1', normalizeToEmberData: true, modelType: 'registry-extension' });
    }

    /**
     * Submits the registry extension for approval.
     *
     * @return {Promise<RegistryExtensionModel>}
     * @memberof RegistryExtensionModel
     */
    @action approve(params = {}) {
        const owner = getOwner(this);
        const fetch = owner.lookup('service:fetch');

        return fetch.post('registry-extensions/approve', { id: this.id, ...params }, { namespace: '~registry/v1', normalizeToEmberData: true, modelType: 'registry-extension' });
    }

    /**
     * Submits the registry extension for rejection.
     *
     * @return {Promise<RegistryExtensionModel>}
     * @memberof RegistryExtensionModel
     */
    @action reject(params = {}) {
        const owner = getOwner(this);
        const fetch = owner.lookup('service:fetch');

        return fetch.post('registry-extensions/reject', { id: this.id, ...params }, { namespace: '~registry/v1', normalizeToEmberData: true, modelType: 'registry-extension' });
    }

    /**
     * Downloads the extension latest bundle Zip.
     *
     * @return {Promise<>}
     * @memberof RegistryExtensionModel
     */
    @action downloadBundle() {
        const owner = getOwner(this);
        const fetch = owner.lookup('service:fetch');

        return fetch.download(`registry-extensions/download-bundle`, { id: this.id }, { namespace: '~registry/v1', fileName: this.latest_bundle_filename, mimeType: 'application/x-zip' });
    }

    /**
     * Adds a new tag to the tags array.
     *
     * This method takes a tag and adds it to the 'tags' array property
     * of the current instance. The 'pushObject' method is used, which is
     * typically available in Ember.js or similar frameworks that extend
     * JavaScript array functionalities.
     *
     * @param {string} tag - The tag to be added to the tags array.
     */
    @action addTag(tag) {
        this.tags.push(tag);
        this.tags = [...this.tags];
    }

    /**
     * Removes a tag from the tags array at a specific index.
     *
     * This method takes an index and removes the element at that position
     * from the 'tags' array property of the current instance. The 'removeAt'
     * method is used, which is typically available in Ember.js or similar
     * frameworks that provide extended array functionalities.
     *
     * @param {number} index - The index of the tag to be removed from the tags array.
     */
    @action removeTag(index) {
        this.tags.removeAt(index);
        this.tags = [...this.tags];
    }
}
